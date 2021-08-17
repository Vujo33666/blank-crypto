import React, { useState } from "react";
import styles from './style.module.css'
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { StylesProvider } from '@material-ui/core/styles';
import { useForm } from "react-hook-form";

const CreateToken = (props) =>{

    const [name,setName] = useState("");
    const [supply,setSupply] = useState(0);
    const [symbol,setSymbol] = useState("");
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
      } = useForm();

    const onSubmit = (data) => {
        alert(JSON.stringify(data));
    }; 

    function handleName(result){
        setName(result);
    }
    function handleSupply(value){
        setSupply(value)
    }
    function handleSymbol(result){
        setSymbol(result.toUpperCase())
    }

    return (
        <div>
            <Header page="create-token" userAddress={props.userAddress} userLogout={props.history}/>
            <h2 className={styles.heading}>CreateToken</h2>
            <div className={styles.container}>
            <StylesProvider injectFirst>
                <form className={styles.form} noValidate onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                    <TextField
                        autoFocus
                        margin="dense"
                        id="email"
                        label="Token name"
                        type="text"
                        {...register("token_name", { required: true })}
                        fullWidth
                        name="token_name"
                        onChange={(e) => handleName(e.target.value)}
                        value={name}
                        className={styles.text_field}
                    />
                    {errors.token_name && <span className={styles.error_msg}>This field is required</span>}
                    <TextField
                        margin="dense"
                        id="email"
                        name="Token symbol"
                        label="Token symbol"
                        type="text"
                        {...register("token_symbol", { required: true })}
                        inputProps={{ maxLength: 4}}
                        fullWidth
                        value={symbol}
                        onChange={(e) => handleSymbol(e.target.value)}
                        className={styles.text_field}
                    />
                    {errors.token_symbol && <span className={styles.error_msg}>This field is required</span>}
                    <TextField 
                        type="number" 
                        name="price"
                        className={styles.number_field}
                        InputProps={{
                            inputProps: { 
                                max: 1000000000000000000000000, min: 1, step: 10.00000000
                            }
                        }}
                        id="outlined-basic"
                        label="Max supply"
                        variant="outlined"
                        {...register("token_supply", { required: true })}
                        value={supply}
                        onChange={(e) => handleSupply(e.target.value)}
                    />
                    {errors.token_supply && <span className={styles.error_msg}>This field is required</span>}
                    <Button 
                        className={styles.button} 
                        variant="contained"
                        color="primary"
                        type="submit"
                    >
                        Create
                    </Button>
                </form>
                <Footer />
                </StylesProvider>
            </div>
        </div>
    );
}

export default CreateToken;