import axios from 'axios';
import React, { useEffect, useState } from 'react';
import TableContent from './TableContent';
type InputFileProps =  {
    type: string,

}

const InputFile = ({type}: InputFileProps) => {
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [isDisabled, setIsDisabled] = useState<boolean>(false);
    const [data, setData] = useState<any[] | null>(null);
    const [isHidden, setIsHidden] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
            if(data){
                localStorage.setItem('data', JSON.stringify(data))
                setIsDisabled(true)
            } else {
                setIsDisabled(false)
            }   
            const storage = localStorage.getItem('data')
            if(storage){
                storage.includes('error') 
                ? setIsHidden(true)
                : setIsHidden(false)
            }
    }, [data, error])

    const handleChange = ({target}: React.ChangeEvent<HTMLInputElement>) =>{
        if(target.files && target.files.length > 0){
            setUploadedFile(target.files[0]);
            localStorage.clear()
            setData(null)
            setIsHidden(true)
            setError(null)
        }
    }
    const uploadFile = async () => {
        if(uploadedFile){
            const formData = new FormData();
            formData.append('file', uploadedFile);
            try{
                const data = await axios.post('http://localhost:3001/products', formData)
                setData(data.data)
            } catch (err) {
                setError(err.response.data)
            }
        }
    }
  return (
    <div className='container'>
        <label htmlFor='input' className='input_label'>Carregue o Arquivo CSV abaixo:</label>
        <input type= {type} 
        id='input'
        className='input' 
        placeholder='Arquivo.csv'
        onChange={handleChange}/>
        <div className='input_btns'>
        <button 
        onClick={uploadFile}
        className='btn_input_validate'
        disabled = {isDisabled}>Validar</button>
        {error && (<h1> Arquivo CSV com Erro de formatação </h1>)}
        <button 
        // onClick={updateDateBase}
        className='btn_input_execute'
        hidden = {isHidden}>Executar</button>
        </div>
        <TableContent data={data}/>
    </div>
  )
}

export default InputFile