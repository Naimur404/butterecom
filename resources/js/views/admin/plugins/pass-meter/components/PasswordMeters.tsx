import ComponentCard from '@/components/cards/ComponentCard'
import PasswordInputWithStrength from '@/components/PasswordInputWithStrength'
import { useState } from 'react'
import { Col, Collapse, FormControl, FormLabel, FormText, Row } from 'react-bootstrap'
import PasswordChecklist from 'react-password-checklist'

const PasswordMeters = () => {
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  return (
    <Row className="justify-content-center">
      <Col lg={6}>
        <ComponentCard title="Progress Bar" isCollapsible>
          <PasswordInputWithStrength password={password} setPassword={setPassword} showIcon />
        </ComponentCard>
      </Col>

      <Col lg={6}>
        <ComponentCard title="Password Condition" isCollapsible>
          <FormLabel>Magic Password ✨ (Click Here)</FormLabel>
          <FormControl type="password" placeholder="Enter password" value={password2} onChange={(e) => setPassword2(e.target.value)} />
          <FormText>Use 8 or more characters with a mix of letters, numbers & symbols.</FormText>

          <Collapse in={password2.length > 0}>
            <div className="password-box bg-light-subtle border border-light mt-2 rounded">
              <PasswordChecklist rules={['minLength', 'specialChar', 'number', 'capital', 'lowercase']} minLength={8} value={password2} iconSize={8} validTextColor="#02BC9C" invalidTextColor="#F7577E" validColor="#02BC9C" invalidColor="#F7577E" className="m-2" />
            </div>
          </Collapse>
        </ComponentCard>
      </Col>
    </Row>
  )
}

export default PasswordMeters
