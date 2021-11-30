import { Formik, Form, Field, ErrorMessage } from 'formik'
import FormControl from 'react-bootstrap/FormControl'
import FormGroup from 'react-bootstrap/FormGroup'
import FormLabel from 'react-bootstrap/FormLabel'
import Button from 'react-bootstrap/Button'
import DatePicker from 'react-datepicker'
import { registerLocale, setDefaultLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useTranslation } from 'react-i18next'

import enUS from 'date-fns/locale/en-US'
import fr from 'date-fns/locale/fr'
import pt from 'date-fns/locale/pt'

import styles from './styles.module.css'
import CustomerAutocomplete from 'components/Customer/CustomerAutocomplete'
import ProductAutocomplete from 'components/Product/ProductAutocomplete'

type formOption = {
  label: string
  value: string | boolean | number
}

type formOptions = formOption[]

type formItem = {
  label: string
  name: string
  options?: formOptions
  placeholder: string
  readOnly?: boolean
  required: boolean
  type:
    | 'text'
    | 'number'
    | 'select'
    | 'CustomerAutocomplete'
    | 'Datepicker'
    | 'ProductAutocomplete'
  value: string | boolean | number | {}
  valueType?: 'string' | 'number' | 'boolean'
}

export type FormConfig = formItem[]

export type FormProps = {
  config: FormConfig
  values: ReturnValues | null
  layout?: 'horizontal' | 'vertical'
  title?: string
  onSubmit: (values: ReturnValues) => void
}

export type ReturnValues = {
  [key: string]: string | boolean | number | any
}

const localesDatepicker = [
  { code: 'en', locale: enUS },
  { code: 'fr', locale: fr },
  { code: 'pt', locale: pt },
]

const FormRender = ({
  config,
  layout = 'vertical',
  title,
  values,
  onSubmit,
}: FormProps) => {
  const { i18n } = useTranslation()

  const defaultValues = config.reduce(
    (acc, curr) => ({
      ...acc,
      [curr.name]: curr.value,
    }),
    {}
  )

  localesDatepicker.forEach(({ code, locale }) => {
    registerLocale(code, locale)
  })
  setDefaultLocale(i18n.language)

  const normaliseValues = (values: ReturnValues): ReturnValues => {
    let returnValues: ReturnValues = {}
    Object.keys(values).forEach((key) => {
      const configItem = config.find((item) => item.name === key)
      if (configItem?.valueType) {
        if (configItem.valueType === 'number') {
          returnValues[key] = Number(values[key].id || values[key])
        }
        if (configItem.valueType === 'boolean') {
          returnValues[key] = values[key] === 'true'
        }
      } else {
        returnValues[key] = values[key]
      }
    })
    return returnValues
  }

  const handleSubmit = (values: ReturnValues) => {
    const returnValues = normaliseValues(values)
    onSubmit(returnValues)
  }

  return (
    <>
      {title && <h3>{title}</h3>}
      <Formik
        initialValues={values || defaultValues}
        onSubmit={(values, { setSubmitting }) => {
          handleSubmit(values)
          setSubmitting(false)
        }}
      >
        {({
          isSubmitting,
          handleSubmit,
          handleChange,
          setFieldValue,
          values,
          touched,
        }) => (
          <Form onSubmit={handleSubmit} className={styles[layout]}>
            {config.map(
              ({
                name,
                label,
                type,
                placeholder,
                required,
                readOnly,
                options,
              }) => (
                <FormGroup key={name}>
                  <Field name={name}>
                    {({ field, form, meta }: any) => (
                      <FormGroup key={name}>
                        <FormLabel>{label}</FormLabel>
                        {['text', 'number'].includes(type) && (
                          <FormControl
                            defaultValue={field.value}
                            name={name}
                            onChange={handleChange}
                            placeholder={placeholder}
                            readOnly={readOnly || false}
                            required={required}
                            type={type}
                          />
                        )}
                        {['select'].includes(type) && (
                          <FormControl
                            as="select"
                            defaultValue={field.value}
                            name={name}
                            onChange={handleChange}
                            placeholder={placeholder}
                            readOnly={readOnly || false}
                            required={required}
                            type={type}
                          >
                            {!!options &&
                              options.map((option: formOption) => (
                                <option
                                  key={option.label}
                                  value={String(option.value)}
                                >
                                  {option.label}
                                </option>
                              ))}
                          </FormControl>
                        )}
                        {type === 'CustomerAutocomplete' && (
                          <CustomerAutocomplete
                            onChange={(customer: any) =>
                              setFieldValue(name, customer)
                            }
                            value={field.value}
                          />
                        )}
                        {type === 'ProductAutocomplete' && (
                          <ProductAutocomplete
                            onChange={(customer: any) =>
                              setFieldValue(name, customer)
                            }
                            value={field.value}
                          />
                        )}
                        {type === 'Datepicker' && (
                          <DatePicker
                            className={styles.datepicker}
                            locale={i18n.language}
                            selected={field.value}
                            onChange={(date) => setFieldValue(name, date)}
                            dateFormat="P"
                          />
                        )}
                      </FormGroup>
                    )}
                  </Field>

                  <ErrorMessage name={name} component="div" />
                </FormGroup>
              )
            )}
            <Button
              type="submit"
              disabled={isSubmitting}
              className={styles.btnSubmit}
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default FormRender
