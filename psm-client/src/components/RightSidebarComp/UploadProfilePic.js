import Constants from "../utils/Constants";
const UploadProfilePic=()=>{

    // API Key: 9d7deae4f031362518b0
    // API Secret: fe6e55672aa98df4998c14fbd9f526327c8434eb2518c835488a90094f514042
    // JWT: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI4YWM3OWExMi0zZTZkLTRlOGEtOTk4NS0wYmJmNGE5MzU0NjkiLCJlbWFpbCI6ImtyYW50aGlwdXR0YXBha2FAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiRlJBMSJ9LHsiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiTllDMSJ9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjlkN2RlYWU0ZjAzMTM2MjUxOGIwIiwic2NvcGVkS2V5U2VjcmV0IjoiZmU2ZTU1NjcyYWE5OGRmNDk5OGMxNGZiZDlmNTI2MzI3Yzg0MzRlYjI1MThjODM1NDg4YTkwMDk0ZjUxNDA0MiIsImV4cCI6MTc2Mzc0MzU5NH0.Q3ge3vPDCJsQlm8TnyKbjx5ZRKnys1LbGGStrRqr15Y
    const form = new FormData();
    form.append("name", "<string>");
    form.append("group_id", "<string>");
    form.append("keyvalues", "{}");

    const options = {
    method: 'POST',
    headers: {Authorization: 'Bearer <token>', 'Content-Type': 'multipart/form-data'}
    };

    options.body = form;

    fetch('https://uploads.pinata.cloud/v3/files', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));

}
export default UploadProfilePic;