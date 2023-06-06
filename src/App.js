import './App.css';
import { useEffect, useRef, useState } from 'react';

import UserList from './components/UserList';
import FormPanel from './components/FormPanel';
import SuccessReg from './components/SuccessReg';
import Loader from './components/UI/loader/Loader'
import HeaderContent from './components/HeaderContent';

import { sortByNewest } from './utils/sortByNewest';
import { useFetch } from './hooks/useFetch';
import { apiRequest } from './APIservice/ApiService';
import { scrollToEllement } from './utils/scrollToElement';
import { showMessage } from './utils/showMessage'
import { loadMoreData } from './utils/loadMoreData';

function App() {
  const formRef = useRef()
  const usersRef = useRef()
  const [token, setToken] = useState('')
  const [positionsData, setPositionsData] = useState([])
  const [userList, setUserList] = useState([])
  const [usersURL, setUsersURL] = useState();
  const [pagination, setPagination] = useState({ prev: "", next: "" })
  const [successMessage, setSuccessMessage] = useState(false)

  const [fetchUsersData, isUsersDataLoad, usersDataError] = useFetch(async (usersURL) => {
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
  }, 300)
  const [fetchToken, isTokenLoad, tokenDataError] = useFetch(async () => {
    const response = await apiRequest.getToken()
    setToken(response)
  }, 0)
  const [fetchNEwUser, isNewUserLoad, newUserError] = useFetch(apiRequest.postUser, 0);

  const resetUserList = () => {
    setUserList([])
    setUsersURL()
  }

  useEffect(() => {
    fetchUsersData(usersURL)
  }, [usersURL])

  useEffect(() => {
    fetchPosList()
    fetchToken()
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

    await fetchToken()
    await fetchNEwUser(token, formData)

    scrollToEllement(usersRef)
    resetForm()
    setUserList([])
    showMessage(2500, setSuccessMessage)
    fetchUsersData()
  };



  return (
    <div className="App">

      <header className="header">
        <HeaderContent
          formRef={formRef}
          usersRef={usersRef}>
        </HeaderContent>
      </header>

      <main ref={usersRef} className='users-section'>
        <h1 className='section-heading'>Working with GET request</h1>
        {usersDataError && <div>{usersDataError.toString()}</div>}
        {successMessage
          ? <>
            <Loader />
            <SuccessReg />
          </>
          : <UserList
            usersRef={usersRef}
            isUsersDataLoad={isUsersDataLoad}
            userList={userList}
            pagination={pagination}
            setUsersURL={setUsersURL}
            loadMoreData={loadMoreData}
            resetUserList={resetUserList}
          />
        }
      </main>

      <section ref={formRef} className='form-section'>
        <h1 className='section-heading'>Working with POST request</h1>
        <FormPanel
          handleSubmit={handleSubmit}
          positionsData={positionsData}
          isPosListLoad={isPosListLoad}
          posListError={posListError}
        >
        </FormPanel>
      </section>

    </div>
  );
}

export default App;
