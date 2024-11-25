import axios from 'axios';
import {BASE_URL, Do_Login, GET_BUSINESS_MEMBER, GET_CITIES, GET_STATES, GET_HOME,POST_PDF, GET_FEEDBACK, GET_PROFILE, GET_MEMBERS, GET_PARTNER,
        GET_SUBCASTS, GET_QUALIFICATION, GET_HOME_BANNER, POST_EDIT_PROFILE, GET_ACTIVITY, POST_IMAGE, POST_MULTIPLE_IMAGE,
      GET_BHARATMANDIR, POST_EVENT } from './apiUrls'


 export const DoLogin = async (mobile, password) => {
      const loginUrl = `${BASE_URL}${Do_Login}`;
      const data = { mobile: mobile, password: password };
      return  axios.post(loginUrl, data, {
      header: {
        'Content-Type' : 'application/json'
      }
    })
      .then(response => {
        return response.data;
    })
      .catch(error => {
        console.error("Error fetching data: ", error)
        throw error;
    })
    }

    export const GetBusinessMembers = async (token) => {
      const businessurl = `${BASE_URL}${GET_BUSINESS_MEMBER}`;
      return  axios.get(businessurl,{
      header: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        return response.data;
    })
      .catch(error => {
        console.error("Error fetching data: ", error)
        throw error;
    })
    }

    export const GetStates = async (token) => {
      const stateurl = `${BASE_URL}${GET_STATES}`;
      return  axios.get(stateurl,{
      headers: {
        Authorization: `Bearer ${token}`,
       'Content-Type': 'application/json',
      }
    })
      .then(response => {
        return response.data;
    })
      .catch(error => {
        console.error("Error fetching data: ", error)
        throw error;
    })
  }

    
    export const GetCities = async (token,stateId) => {
      const citiesurl = `${BASE_URL}${GET_CITIES}${stateId}`;
      return  axios.get(citiesurl,{
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    })
      .then(response => {
        return response.data;
    })
      .catch(error => {
        console.error("Error fetching data: ", error)
        throw error;
    })
    }

    export const GetHome = async (token) => {
      const homeurl = `${BASE_URL}${GET_HOME}`;
      return  axios.get(homeurl,{
      header: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        return response.data;
    })
      .catch(error => {
        console.error("Error fetching data: ", error)
        throw error;
    })
    }

    export const GetBharatMandir = async (token) => {
      const bharatmandirurl = `${BASE_URL}${GET_BHARATMANDIR}`;
      return  axios.get(bharatmandirurl,{
      header: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        return response.data;
    })
      .catch(error => {
        console.error("Error fetching data: ", error)
        throw error;
    })
    }

    export const GetHomeBanner = async (token) => {
      const homebannerurl = `${BASE_URL}${GET_HOME_BANNER}`;
      return  axios.get(homebannerurl,{
      header: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        return response.data;
    })
      .catch(error => {
        console.error("Error fetching data: ", error)
        throw error;
    })
    }

    export const GetQualification = async (token) => {
      const qualificationurl = `${BASE_URL}${GET_QUALIFICATION}`;
      return  axios.get(qualificationurl,{
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    })
      .then(response => {
        return response.data;
    })
      .catch(error => {
        console.error("Error fetching data: ", error)
        throw error;
    })
    }

    export const GetProfile = async (token) => {
      const profileurl = `${BASE_URL}${GET_PROFILE}`;
      return  axios.get(profileurl,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        return response;
    })
      .catch(error => {
        console.error("Error fetching data: ", error)
        throw error;
    })
    }

    export const PostEditProfile = async (token,data) => {
      const editprofileurl = `${BASE_URL}${POST_EDIT_PROFILE}`;
      return  axios.get(editprofileurl, data,{
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    })
      .then(response => {
        return response.data;
    })
      .catch(error => {
        console.error("Error fetching data: ", error)
        throw error;
    })
    }

    export const PostEvents = async (token,data) => {
      const posteventurl = `${BASE_URL}${POST_EVENT}`;
      return  axios.post(posteventurl, data,{
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    })
      .then(response => {
        return response.data;
    })
      .catch(error => {
        console.error("Error fetching data: ", error)
        throw error;
    })
    };

    

    export const PostPdf = async (token,formData) => {
      const postpdfurl = `${BASE_URL}${POST_PDF}`;
      return  axios.post(postpdfurl, formData,{
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',       
      }
    })
      .then(response => {
        return response.data;
    })
      .catch(error => {
        console.error("Error fetching data: ", error)
        throw error;
    })
    }

    export const PostMultipleImage = async (token,formData) => {
      const postmultipleimageurl = `${BASE_URL}${POST_MULTIPLE_IMAGE}`;
      return  axios.post(postmultipleimageurl, formData,{
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',       
      }
    })
      .then(response => {
        return response.data;
    })
      .catch(error => {
        console.error("Error fetching data: ", error)
        throw error;
    })
    }

    export const PostImage = async (token,formData) => {
      const postimageurl = `${BASE_URL}${POST_IMAGE}`;
      return  axios.post(postimageurl, formData,{
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',       
      }
    })
      .then(response => {
        return response.data;
    })
      .catch(error => {
        console.error("Error fetching data: ", error)
        throw error;
    })
    }

    export const GetActivity = async (token, page, pageSize = 20) => {
      const getactivityurl = `${BASE_URL}${GET_ACTIVITY}&page=${page}&size=${pageSize}`;
      return  axios.get(getactivityurl,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        return response.data;
    })
      .catch(error => {
        console.error("Error fetching data: ", error)
        throw error;
    })
    }

    export const GetMembers = async (token, page = 1, searchQuery, stateName, cityName) => {
      const getmemberurl = `${BASE_URL}${GET_MEMBERS}`
      return  axios.get(getmemberurl,{
        params:{
              page:page,
              size:20,
              q:searchQuery,
              state:stateName,
              city:cityName
        },
      headers: {
        Authorization: `Bearer ${token}`     
      }
    })
      .then(response => {
        return response.data;
    })
      .catch(error => {
        console.error("Error fetching data: ", error)
        throw error;
    })
   }
      //?q=&page=1&size=20&community_id=11&state=&city=&gender=&occupation=&cast=&subcastId=
   export const GetPartner = async (token, page = 1, searchQuery, stateName, cityName,subcastId,cast,occupation,gender,) => {
    const getpartnerurl = `${BASE_URL}${GET_PARTNER}`
    return  axios.get(getpartnerurl,{
      params:{
            page:page,
            size:20,
            q:searchQuery,
            state:stateName,
            city:cityName,
            community_id:11,
            gender:gender,
            occupation:occupation,
            cast:cast,
            subcastId

      },
    headers: {
      Authorization: `Bearer ${token}`     
    }
  })
    .then(response => {
      return response.data;
  })
    .catch(error => {
      console.error("Error fetching data: ", error)
      throw error;
  })
 }
       

  // export const GetMembers = async (token, page = 1, searchQuery = '', stateName = '', cityName = '') => {
  //   const getmemberurl = `${BASE_URL}${GET_MEMBERS}`;
    
  //   try {
  //     const response = await axios.get(getmemberurl, {
  //       params: {
  //         page: page,
  //         size: 20,
  //         q: searchQuery,
  //         state: stateName,
  //         city: cityName
  //       },
  //       headers: {
  //         Authorization: `Bearer ${token}`
  //       }
  //     });
      
  //     return response.data;
  //   } catch (error) {
  //     console.error("Error fetching data: ", error);
  //     throw error;
  //   }
  // };