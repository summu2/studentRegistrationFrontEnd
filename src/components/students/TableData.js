import React from 'react';
import { Col, Container, Row , Table , Button } from 'reactstrap';

const TableData = (props) => {
    const { allData }  = props


    React.useEffect(()=>{
    },[allData])

    const handleAction = (e) => {
        const name = e.target.name;
        if(name==='edit'){
             props.getEditStudent(e.target.dataset['id'])
        }
        else if(name=== 'delete'){
            if (window.confirm("Are you sure you want to delete this")) {
                const payload = {}
                payload["id"] = e.target.dataset['id']
                payload["is_deleted"] = true
                props.deleteRegisteredStudent(payload)
            }else{
                return false;
            }
        }
    }


    return(
        allData &&
        allData.map((data, index) => {
            return (
                <tr key={data.id}>
                    <td>
                        <div>{data.first_name}</div>
                    </td>
                    <td>
                        <div>{data.last_name}</div>
                    </td>
                    <td>
                        <div>{data.email}</div>
                    </td>
                    <td>
                        <div>{data.phone}</div>
                    </td>
                    <td>
                        <Button name={'edit'} data-id={data.id} onClick={handleAction}>
                            {'Edit'}
                        </Button>
                    </td>
                    <td>
                        <Button name={'delete'} data-id={data.id} onClick={handleAction}>
                            {'Delete'}
                        </Button>

                    </td>
                </tr>

            );
        })

        )
}

export default TableData;