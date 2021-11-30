import { Row, Col, Card, Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { getRoutePath } from 'routes'

const Page404 = () => {
  const { t } = useTranslation()
  return (
    <>
      <Row className="justify-content-md-center">
        <Col xs="5">
          <Card>
            <Card.Body>
              <Card.Title>404</Card.Title>
              <Card.Text>{t('page404.text')}</Card.Text>
              <Link to={getRoutePath('Home')}>
                <Button variant="primary">{t('page404.linkText')}</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default Page404
