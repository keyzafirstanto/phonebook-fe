export default function validate (name,value,validations) {
    //this function gets a name of input, a value of an input and what validations needs to be checked.
    //this file contains many validations type that can be checked.
    //tou can add your own custom validations.
    //this function returns an array of errors that this input had.
    const errors = []
    if(value){
        if(validations.minLength){
            if(value.length<validations.minLength){
                errors.push(`${name} must be longer than ${validations.minLength} characters`)
            }
        }
        if(validations.maxLength){
            if(value.length > validations.maxLength){
                errors.push(`${name} must be less than ${validations.maxLength} characters`)
            }
        }
        if(validations.pattern){
            if(!validations.pattern?.pattern.test(value)){
                for(const error of validations.pattern.error ){
                    errors.push(error)
                }
            }
        }

    }
    else if(validations.required){
        errors.push(`${name} is required`)
    }

    return errors
}