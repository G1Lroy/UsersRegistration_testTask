import { useEffect, useRef, useState } from 'react';
import './App.css';
import UserList from './components/UserList';
import { sortByNewest } from './utils/sortByNewest';
import FormPanel from './components/FormPanel';
import { useFetch } from './hooks/useFetch';
import { apiRequest } from './APIservice/ApiService';
import SuccessReg from './components/SuccessReg';

import HeaderContent from './components/HeaderContent';

function App() {
  const formRef = useRef()
  const usersRef = useRef()
  const [token, setToken] = useState('')
  const [positionsData, setPositionsData] = useState([])
  const [userList, setUserList] = useState([])
  const [usersURL, setUsersURL] = useState();
  const [pagination, setPagination] = useState({ prev: "", next: "" })
  const [successMessage, setSuccessMessage] = useState(false)

  const [fetchUsersData, isUsersDataLoad, usersDataError] = useFetch(async () => {
    const response = await apiRequest.getUsersList(usersURL)
    const sortedUsers = sortByNewest(response.users, "registration_timestamp");
    setUserList((prevUserList) => [...prevUserList, ...sortedUsers]);
    setPagination({
      ...pagination,
      next: response.links.next_url,
      prev: response.links.prev_url
    })

  }, 300)
  const [fetchPosList, isPosListLoad, posListError] = useFetch(async () => {
    const response = await apiRequest.getPositionList()
    setPositionsData(response)
  }, 0)
  const [fetchToken, isTokenLoad, tokenDataError] = useFetch(async () => {
    const response = await apiRequest.getToken()
    setToken(response)
  }, 0)
  const [fetchNEwUser, isNewUserLoad, newUserError] = useFetch(apiRequest.postUser, 200);



  const resetUserList = () => {
    setUserList([]);
    setUsersURL()
  }
  const loadMoreUsers = () => setUsersURL(pagination.next)

  useEffect(() => {
    fetchUsersData()
  }, [usersURL])

  useEffect(() => {
    fetchPosList()
  }, [])

  const handleSubmit = async (values, resetForm) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("position", values.position);
    formData.append("position_id", values.position_id);
    formData.append("phone", values.phone);
    formData.append("photo", values.photo);
    formData.append("registration_timestam", Date.now());

    // await fetchToken()
    // await fetchNEwUser(token, formData)

    showMessageAfterReg();
    resetForm();
    resetUserList();
    fetchUsersData();

  };

  const showMessageAfterReg = () => {

    setSuccessMessage(true)

    setTimeout(() => {
      setSuccessMessage(false)
    }, 3000)
  }


  return (
    <div className="App">
      
      <HeaderContent 
      formRef={formRef} 
      usersRef={usersRef}>

      </HeaderContent>

      <main ref={usersRef} className='users-section'>
        <h1 className='section-heading'>Working with GET request</h1>
        {usersDataError && <div>{usersDataError.toString()}</div>}
        {isUsersDataLoad ? <div>Loading....</div> :
          <UserList
            userList={userList}
            pagination={pagination}
            loadMoreUsers={loadMoreUsers}
            resetUserList={resetUserList}
          >
          </UserList>
        }

      </main>

      <section ref={formRef} className='form-section'>
        {successMessage
          ? <SuccessReg></SuccessReg>
          : <>
            <h1 className='section-heading'>Working with POST request</h1>
            <FormPanel
              handleSubmit={handleSubmit}
              positionsData={positionsData}
              isPosListLoad={isPosListLoad}
              posListError={posListError}
            >
            </FormPanel>
          </>
        }
      </section>

    </div>
  );
}

export default App;
