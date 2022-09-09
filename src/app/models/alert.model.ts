export default interface IAlert {
    inSubmission: boolean
    showAlert: boolean
    alertMsg: string
    alertColor: 'blue' | 'green' | 'red'
}