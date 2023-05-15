import React, { ReactElement, useEffect, useState } from 'react'
type TableContentProps =  {
  data: any[] | null,
}
const TableContent = ({data}: TableContentProps): ReactElement => {
    const[result, setResult] = useState<any[] | null>(null)
    const[existError, setExistError] = useState<boolean>(false)
    useEffect(()=> {
        if(data){
            setResult(data)
            const error = JSON.stringify(data)
            setExistError(error.includes('error'))
        } else {
            setResult(null)
            setExistError(true)
        }
    }, [data])

  return (
   <div className='table'>
    {result && (
        <table className='table_content'>
            <tr className='table_content_header'>
                <th>code</th>
                <th>name</th>
                <th>costPrice</th>
                <th>salesPrice</th>
                <th>newPrice</th>
                <th hidden={!existError}>error</th>
            </tr>
            {result?.map((e)=> (
                <tr 
                key={e.code} 
                className={e.error ? 'table_content_row_error' : 'table_content_row_pass'}
                >
                    <td>{e.code}</td>
                    <td>{e.name}</td>
                    <td>{e.costPrice}</td>
                    <td>{e.salesPrice}</td>
                    <td>{e.newPrice}</td>
                    <td hidden={!existError} className='error'>{e.error}</td>
                </tr>
            ))}
        </table>
    )}
    </div>
  )
}

export default TableContent