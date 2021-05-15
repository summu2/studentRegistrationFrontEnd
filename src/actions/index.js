import { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { studentAuthWebAppAxios } from '../axios';



// delete_student
function deleteStudent(body){
  const url = '/delete_student';
  return studentAuthWebAppAxios.put(url,body);
}

export function useDeleteStudent() {
  return useApiHandler(deleteStudent);
}


// get_student_by_id
function getStudent(urlsParams){
  const usp = new URLSearchParams();
  usp.set('id', urlsParams.id);
  const queryParams = `?${usp.toString()}`;
  const url = `/get_student_by_id${queryParams}`;
  return studentAuthWebAppAxios.get(url);
}

export function useGetStudent() {
  return useApiHandler(getStudent);
}


// createUpdateStudent
function createUpdateStudent(body){
  const url = '/create_or_update_student';
  return studentAuthWebAppAxios.post(url,body);
}

export function useCreateUpdateStudent() {
  return useApiHandler(createUpdateStudent);
}

// get_all_students
function getAllStudents(urlParams={}){
  let url = '/get_all_students';
  if(Object.keys(urlParams).length>0){
    const usp = new URLSearchParams();
    usp.set('sort', urlParams.sort);
    usp.set('direction', urlParams.direction);
    const queryParams = `?${usp.toString()}`;
    url = `/get_all_students${queryParams}`;
  }

  return studentAuthWebAppAxios.get(url);
}

export function useGetAllStudents() {
  return useApiHandler(getAllStudents);
}


export function useApiHandler(apiCall, options = { notify: false }) {
  const [reqStatus, setReqStatus] = useState({
    error: null,
    data: null,
    loading: false,
  });


  useEffect(() => {
    if (reqStatus.loading) {
        const id = Date.now();
        toast.warning('In Process Please Wait... ', { toastId: id, autoClose: false, hideProgressBar: true });
    } else if (!reqStatus.loading) {
        toast.dismiss();
    }

    if (reqStatus.error) {
      const errorMsg = reqStatus.error;
      toast.error(errorMsg);
    }
    console.log('reqStatus::: ', reqStatus);
    if (reqStatus?.data?.data?.msg) {
      const successMsg = reqStatus.data.data.msg;
      console.log('successMsg::: ', successMsg)
      toast.success(successMsg);
    }
  }, [reqStatus]);

  const handler = async (...data) => {
    setReqStatus({
      error: null,
      data: null,
      loading: true,
    });
    try {
      const json = await apiCall(...data);
      if (json.data.success) {
        setReqStatus({
          error: null,
          data: json.data,
          loading: false,
        });
      } else {
        setReqStatus({
          error: json.data.data.error,
          data: null,
          loading: false,
        });
      }
      return json.data;
    } catch (error) {
      const message = (error.response && error.response.data.error) || 'Something went wrong!';
      setReqStatus({
        error: message,
        data: null,
        loading: false,
      });
      return null;
    }
  };
  return [handler, { ...reqStatus }];
}
