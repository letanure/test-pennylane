import { useTranslation } from 'react-i18next'
import { Dropdown } from 'react-bootstrap'

const LanguageSwitcher = () => {
  const { i18n } = useTranslation()
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'Français' },
  ]

  return (
    <>
      <Dropdown>
        <Dropdown.Toggle variant="dark" size="sm">
          {languages.find((l) => l.code === i18n.language)?.name}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {languages.map(({ code, name }) => (
            <Dropdown.Item key={code} onClick={() => i18n.changeLanguage(code)}>
              {name}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </>
  )
}

export default LanguageSwitcher
