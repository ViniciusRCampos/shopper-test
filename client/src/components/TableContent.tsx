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
                <th>Código</th>
                <th>Nome</th>
                <th>Custo</th>
                <th>Valor</th>
                <th>Novo Valor</th>
                <th hidden={!existError}>Error</th>
            </tr>
            {result?.map((e)=> (
                <tr 
                key={e.code} 
                className={e.error ? 'table_content_row_error' : 'table_content_row_pass'}
                >
                    <td>{e.code}</td>
                    <td>{e.name}</td>
                    <td>R$ {e.costPrice}</td>
                    <td>R$ {e.salesPrice}</td>
                    <td>R$ {e.newPrice}</td>
                    <td hidden={!existError} className='error'>{e.error}</td>
                </tr>
            ))}
        </table>
    )}
    </div>
  )
}

export default TableContent