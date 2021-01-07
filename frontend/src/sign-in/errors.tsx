import { ValidationError } from "../validation/validation-error"

type Props = {
  errors: ValidationError
}

export const Errors = ({ errors }: Props) => {
  return (
    <>
      {errors.hasError() && (
        <ul className={'errors'}>
          {errors.getErrors().map((error, index) => <li className={'error'} key={index}>{error}</li>)}
        </ul>
      )}
    </>
  )
}
