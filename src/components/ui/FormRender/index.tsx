import { Formik, Form, Field, ErrorMessage } from 'formik'
import FormControl from 'react-bootstrap/FormControl'
import FormGroup from 'react-bootstrap/FormGroup'
import FormLabel from 'react-bootstrap/FormLabel'
import Button from 'react-bootstrap/Button'

import styles from './style.module.css'
import CustomerAutocomplete from 'components/Customer/CustomerAutocomplete'

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
  type: 'text' | 'number' | 'select' | 'CustomerAutocomplete'
  value: string | boolean | number | {}
  valueType?: 'string' | 'number' | 'boolean'
}

export type FormConfig = formItem[]

export type ReturnValues = {
  [key: string]: string | boolean | number | any
}

interface FormProps<T extends ReturnValues> {
  config: FormConfig
  values: T
  layout?: 'horizontal' | 'vertical'
  onSubmit: (values: T) => void
}

const FormRender = <T extends ReturnValues>({
  config,
  values,
  layout = 'vertical',
  onSubmit,
}: FormProps<T>) => {
  const normaliseValues = (values: T): T => {
    let returnValues = {} as ReturnValues
    Object.keys(values).forEach((key: string) => {
      const configItem = config.find((item: formItem) => item.name === key)
      if (configItem?.valueType) {
        if (configItem.valueType === 'number') {
          returnValues[key] = Number(values[key])
        }
        if (configItem.valueType === 'boolean') {
          returnValues[key] = values[key] === 'true'
        }
      } else {
        returnValues[key] = values[key]
      }
    })
    return returnValues as T
  }

  const handleSubmit = (values: T) => {
    const returnValues = normaliseValues(values)
    onSubmit(returnValues)
  }

  return (
    <>
      <Formik
        initialValues={values}
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
                value,
              }: formItem) => (
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
