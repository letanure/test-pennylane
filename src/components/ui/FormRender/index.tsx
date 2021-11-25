import { Formik, Form, Field, ErrorMessage } from 'formik'
import FormControl from 'react-bootstrap/FormControl'
import FormGroup from 'react-bootstrap/FormGroup'
import FormLabel from 'react-bootstrap/FormLabel'
import Button from 'react-bootstrap/Button'

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
  value: string | boolean | number
  valueType?: 'string' | 'number' | 'boolean'
}

export type FormConfig = formItem[]

export type FormProps = {
  config: FormConfig
  values: any
  onSubmit: (values: ReturnValues) => void
}

export type ReturnValues = {
  [key: string]: string | boolean | number
}

const FormRender = ({ config, values, onSubmit }: FormProps) => {
  const normaliseValues = (values: ReturnValues): ReturnValues => {
    let returnValues: ReturnValues = {}
    Object.keys(values).forEach((key) => {
      const configItem = config.find((item) => item.name === key)
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
    return returnValues
  }

  const handleSubmit = (values: ReturnValues) => {
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
          <Form onSubmit={handleSubmit}>
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
                              setFieldValue(name, customer.id)
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
            <Button type="submit" disabled={isSubmitting}>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default FormRender
