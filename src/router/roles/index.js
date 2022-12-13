import { admin } from './admin'
import { GD } from './GD'
import { accounting } from './accounting'
import { lawyer } from './lawyer'
import { PTO } from './PTO'
import { logistician } from './logistician'
import { finDir } from './finDir'
import { PKO } from './PKO'
import { techSupervisor } from './tech-supervisor'
import { viceGD } from './viceGD'
import { engineer } from './engineer'
import { GEE } from './GEE'
import { techService } from './techService'
import { surveyor } from './surveyor'
import { contractor } from './contractor'
import { GSETOiS } from './GSETOiS'
import { ESETOiS } from './ESETOiS'
import { DS } from './DS'
import { ComDir } from './ComDir'
import { ORR } from './ORR'
import { lawyerNotification } from './lawyerNotification'

export const roles = [
  ...admin,
  ...GD,
  ...accounting,
  ...lawyer,
  ...PTO,
  ...logistician,
  ...finDir,
  ...PKO,
  ...techSupervisor,
  ...viceGD,
  ...engineer,
  ...GEE,
  ...techService,
  ...surveyor,
  ...contractor,
  ...GSETOiS,
  ...ESETOiS,
  ...DS,
  ...ComDir,
  ...ORR,
  ...lawyerNotification
]
