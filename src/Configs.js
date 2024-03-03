//NODE JS LOCAL
const API_BASE_URL = 'http://localhost:3000/api/v1/';
//RENDER.COM
//const API_BASE_URL = 'https://planning-app-backend.onrender.com/api/v1/'

const API_ENDPOINTS_TASK =
[
    {name:'TaskPendingsAll', endpoint:'Task/GetOnlyPendings'},
    {name:'TaskUpdateStatus', endpoint:'Task/UpdateStatus'},
    {name:'TaskUpdatePriority', endpoint:'Task/UpdatePriority'},
    {name:'TaskUpdateDescription', endpoint:'Task/UpdateDescription'},
    {name:'TaskUpdateGroup', endpoint:'Task/UpdateGroup'},
    {name:'CreateTask', endpoint:'Task/CreateTask'},
    {name:'GetAllTask', endpoint:'Task/GetAll'},
    {name:'GetTaskByGroup', endpoint:'Task/GetByGroup'},
    {name:'DeleteTask', endpoint:'Task/DeleteTask'},
    {name:'TaskUpdateDescription', endpoint:'Task/UpdateDescription'},
   
]

const API_ENDPOINTS_GROUPS =
[
  {name:'CreateGroup', endpoint:'Group/CreateGroup'},
  {name:'GetAllGroup', endpoint:'Group/GetAll'},
  {name:'DeleteGroup', endpoint:'Group/DeleteGroup'},
  {name:'GetWithoutProject', endpoint:'Group/WithoutProject'}
]


const API_ENDPOINTS_PROJECTS=
[
  {name:'GetAllProject', endpoint:'Project/GetAll'},
  {name:'GetAllProjectGroups', endpoint:'Project/GetGroups'},
  {name:'CreateProject', endpoint:'Project/CreateProject'},
  {name:'DeleteProject', endpoint:'Project/DeleteProject'},
]

export { API_BASE_URL, API_ENDPOINTS_TASK , API_ENDPOINTS_GROUPS, API_ENDPOINTS_PROJECTS};