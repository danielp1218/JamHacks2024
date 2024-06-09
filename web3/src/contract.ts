// Find all our documentation at https://docs.near.org
import { NearBindgen, near, call, view, AccountId, initialize, UnorderedMap } from 'near-sdk-js';
import { predecessorAccountId } from 'near-sdk-js/lib/api';


@NearBindgen({ requireInit: true })
class HelloNear {
  // diagnosis: UnorderedMap<> = new UnorderedMap([['', ['']]]);
  diagnosis: UnorderedMap<Array<string>> = new UnorderedMap("as");

  @initialize({ privateFunction: true })
  init() {
    // this.diagnosis = new UnorderedMap([[ near.predecessorAccountId(), ['hi yanzi']]]);
    this.diagnosis.set(near.predecessorAccountId(), ["name", "desc"]);
  }

  @view({}) // This method is read-only and can be called for free
  get_diagnosis({ id }: { id: AccountId }): Array<string> {
    return this.diagnosis.get(id) || [];
  }

  @call({}) // This method changes the state, for which it cost gas
  add_diagnosis({ diag, patient } : { diag: string ; patient: AccountId }): string {
    near.log(`Adding diagnosis ${diag}`);
    // catch case where patient id is not in the directory
    let ptDiag = this.diagnosis.get(patient)
    if(ptDiag != null){
      ptDiag.push(diag)
      this.diagnosis.set(patient, ptDiag)
      near.log(`Diagnosis added`);
      return "Diagnosis Added"
    }
    else {
      near.log(`Patient not found`);
      return "Patient Not Found"
    }
    // this.diagnosis.set(this.patient, this.);
  }

  @call({})  // on every login, check if id exists, if not then add to map using set
  add_user({ id }: { id: AccountId }): string {
    if(this.diagnosis.get(id) !== null){
      return "User already exists"
    }
    else {
      this.diagnosis.set(id, [""])
      return "User added"
    }
  }
}

