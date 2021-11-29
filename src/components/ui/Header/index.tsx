import { Container, Nav, Navbar } from 'react-bootstrap'
import { faFileInvoiceDollar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import LanguageSwitcher from 'components/ui/LanguageSwitcher'
import { getRoutePath } from 'routes'
import styles from './styles.module.css'
console.log(styles)

const Header = () => {
  const { t } = useTranslation()
  return (
    <>
      <Navbar bg="light" expand="lg" className={styles.header}>
        <Container>
          <Navbar.Brand as={Link} to={getRoutePath('home')}>
            <FontAwesomeIcon icon={faFileInvoiceDollar} />{' '}
            {t('general.appName')}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to={getRoutePath('InvoiceList')}>
                {t('nav.InvoiceList')}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <LanguageSwitcher />
        </Container>
      </Navbar>
    </>
  )
}

export default Header
