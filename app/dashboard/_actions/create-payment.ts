'use server'

export async function createPayment(){
    try {
        console.log('Doação feita com sucesso')
        
    } catch(err){
        return {
            status: 400,
            message: err
        }
    }
}