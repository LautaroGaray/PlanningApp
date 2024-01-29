//NET CORE
//const API_BASE_URL = 'http://localhost:59092/api/v1/';
//AUTOMATIC NET CORE
//const API_BASE_URL = 'http://localhost:5000/api/v1/';
//NODE JS
const API_BASE_URL = 'http://localhost:3000/api/v1/';

const API_ENDPOINTS_TASK =
[
    {name:'TaskPendingsAll', endpoint:'Task/GetOnlyPendings'},
    {name:'TaskUpdateStatus', endpoint:'Task/UpdateStatus'},
    {name:'TaskUpdatePriority', endpoint:'Task/UpdatePriority'},
    {name:'TaskUpdateDescription', endpoint:'Task/UpdateDescription'},
    {name:'CreateTask', endpoint:'Task/CreateTask'},
    {name:'GetAllTask', endpoint:'Task/GetAll'},
    {name:'DeleteTask', endpoint:'Task/DeleteTask'},
    {name:'TaskUpdateDescription', endpoint:'Task/UpdateDescription'}
]

  export { API_BASE_URL, API_ENDPOINTS_TASK };