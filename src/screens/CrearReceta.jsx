import React, { useEffect, useState, useRef } from 'react';
import { View, TextInput, Image, StyleSheet, TouchableOpacity, ActivityIndicator, Text, Alert, BackHandler } from 'react-native';
import { Formik, useFormikContext } from 'formik';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import DropDownCategory from '../components/DropDownCategory';
import DropDownPersons from '../components/DropDownPersons';
import DropDownTime from '../components/DropDownTime';
import ToolTip from '../components/Tooltip';
import SuccessAnimation from '../components/SuccessAnimation';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';

import { useNavigation, useIsFocused, useFocusEffect } from '@react-navigation/native';

const CrearReceta = ({ route }) => {

    const formikRef = useRef();
    // const parametro = route.params;
    const [parametro, setParametro] = useState(route.params);
    const navigation = useNavigation();
    const [valueCategory, setValueCategory] = useState(null);
    const [valuePersons, setValuePersons] = useState(null);
    const [valueTime, setValueTime] = useState(null);

    const [showToolTip, setShowToolTip] = useState(false);
    const [indicator, setIndicator] = useState(null)
    const [step, setStep] = useState(1);
    const [stepReceta, setStepReceta] = useState(1);
    const [changed, setChanged] = useState(null);
    const [ingredientes, setIngredientes] = useState([]);
    const [ingredienteActual, setIngredienteActual] = useState("");

    const categorias = ["Entrantes", "Plato Principal", "Guarniciones", "Postres"];

    const [image, setImage] = useState("");

    const [imageStep, setImageStep] = useState("");

    const [success, setSuccess] = useState(false);
    const [successStep, setSuccessStep] = useState(false);

    const [idReceta, setIdReceta] = useState(null);
    const [idPaso, setIdPaso] = useState(null);
    const [edit, setEdit] = useState(false);
    const [changedIng, setChangedIng] = useState(null);

    const [initialValues, setInitialValues] = useState({
        titulo: '',
        ingredientes: '',
        tiempo_preparacion: '',
        descripcion: '',
        rutaImagenPrincipal: '',
        descripcion_paso: '',
        titulo_paso: '',
        image: null
    });
    useEffect(() => {
        setParametro(route.params);
    }, [route.params]);

    useEffect(() => {
        if (parametro) {
            setEdit(true);
        } else {
            setEdit(false);
        }
    }, [setEdit, navigation, parametro]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setStepReceta(1)
        });

        // Return para realizar la limpieza cuando el componente se desmonta
        return unsubscribe;
    });

    useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {

            setEdit(false);
            setImage(null)
            setImageStep(null)
            setParametro(null);
            setStep(1)
            setStepReceta(1)
            setChangedIng(false)
            formikRef.current?.resetForm();
            resetFormValues();

        });

        return unsubscribe;
    });

    useEffect(() => {
        if (parametro && parametro.parametro && !changed) {
            const pasosTitulos = parametro.parametro.pasos.map(paso => paso.titulo);
            const tituloPasoActual = pasosTitulos[stepReceta - 1];
            const pasosDescripcion = parametro.parametro.pasos.map(paso => paso.descripcion);
            const descripcionPasoActual = pasosDescripcion[stepReceta - 1];

            const pasosId = parametro.parametro.pasos.map(paso => paso.id);
            const idPasoActual = pasosId[stepReceta - 1];

            const pasosImage = parametro.parametro.pasos.map(paso => paso.ruta_imagen);
            const imagenPasoActual = pasosImage[stepReceta - 1];

            setInitialValues({
                titulo: parametro.parametro.receta.titulo,
                ingredientes: parametro.parametro.receta.ingredientes.split(","),
                tiempo_preparacion: parametro.parametro.receta.tiempo_preparacion,
                descripcion: parametro.parametro.receta.descripcion,
                rutaImagenPrincipal: parametro.parametro.receta.rutaImagenPrincipal,
                descripcion_paso: descripcionPasoActual,
                titulo_paso: tituloPasoActual
            });

            setImage(parametro.parametro.receta.rutaImagenPrincipal);

            if (!changed) {
                setImageStep(imagenPasoActual)

            } else {
                setImageStep(imageStep)
                setChanged(false)
            }
            if (changedIng) {
                setInitialValues(prevValues => {
                    const updatedValues = {
                        ...prevValues,
                        ingredientes: ingredientes
                    };
                    return updatedValues;
                });
                setIngredientes(ingredientes
                )
            } else {
                setIngredientes(parametro.parametro.receta.ingredientes.split(","));
            }

            setIdPaso(idPasoActual)
            setIdReceta(parametro.parametro.receta.id);
            setValuePersons(parametro.parametro.receta.num_personas);
            setValueTime(parametro.parametro.receta.tiempo_preparacion);
            setValueCategory(parametro.parametro.receta.categoria_id);
        }
    }, [step, parametro, stepReceta, idPaso, changed, imageStep, changedIng]);

    const resetFormValues = () => {
        setStep(1)
        setStepReceta(1)
        formikRef.current?.resetForm();
        setIngredientes([])
        setValuePersons(null)
        setValueTime(null)
        setChanged(null)
        setValueCategory(null)
        setEdit(false)
        setParametro(null)
        setInitialValues({
            titulo: "",
            ingredientes: "",
            tiempo_preparacion: "",
            descripcion: "",
            rutaImagenPrincipal: "",
            descripcion_paso: '',
            titulo_paso: ''
        });

    }
    const handleId = () => {
        navigation.navigate('VerReceta', idReceta)
        navigation.setParams(null);
        navigation.navigate('Mis recetas');

        resetFormValues()
    }

    const handleNextStep = (values) => {
        if (step === 1 && !values.titulo) { timeOut(); return; }
        else if (step === 2 && ingredientes.length <= 0) { timeOut(); return; }
        else if (step === 3 && !valuePersons) { timeOut(); return; }
        else if (step === 4 && !values.descripcion) { timeOut(); return; }
        else if (step === 5 && !valueTime) { timeOut(); return; }
        else if (step === 7 && !valueCategory) { timeOut(); return; }
        else { setStep(step + 1); }

        if (step == 12) {
            setStepReceta(stepReceta + 1)
        }
    };

    const handlepreviousStep = () => {
        if (step > 1) { setStep(step - 1); }
    };

    const timeOut = () => {
        setShowToolTip(true);
        setTimeout(() => {
            setShowToolTip(false);
        }, 3000);

    }

    const handelAdd = () => {
        if (ingredienteActual != "") {
            setIngredientes([...ingredientes, ingredienteActual]);
            setIngredienteActual("");
            if (edit) { setChangedIng(true) }
        } else {
            timeOut();
        }
    };
    const handleDelete = (index) => {
        const newIngredientes = [...ingredientes];
        newIngredientes.splice(index, 1);
        setIngredientes(newIngredientes);
        if (edit) { setChangedIng(true) }


    };

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            aspect: [16, 9],
            quality: 1,
        });

        if (!result.canceled) {
            const uri = result.assets[0].uri;

            const asset = await MediaLibrary.createAssetAsync(uri);


            if (edit) {
                setInitialValues(prevValues => ({
                    ...prevValues,
                    rutaImagenPrincipal: asset.uri,
                }));

                setImage(asset.uri);

                setChanged(true);
            } else {
                setImage(asset.uri);
            }


        }
    };

    const pickImageStep = async () => {
        setChanged(true)
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            aspect: [16, 9],
            quality: 1,
        });

        if (!result.canceled) {
            const uri = result.assets[0].uri;

            const asset = await MediaLibrary.createAssetAsync(uri);

            setImageStep(asset.uri);

        }
    };

    const handleSubmitCreate = async (values, { resetForm }) => {
        setIndicator(true)
        try {
            const storedToken = await SecureStore.getItemAsync('token');

            let data = {
                titulo: values.titulo,
                ingredientes: ingredientes.toString(),
                tiempo_preparacion: valueTime,
                descripcion: values.descripcion,
                categoria_id: valueCategory,
                num_personas: valuePersons,
            };
            if (image !== null) {
                data = {
                    ...data,
                    rutaImagenPrincipal: image,
                };
            }

            const headers = { Authorization: `Bearer ${storedToken}` };

            const response = await axios.post('https://api-receptarium.david-pr.com/api/crear-receta', data, { headers });

            setIdReceta(response.data.id_receta);

            setSuccess(true);
            setEdit(false)
            resetForm()
            setStep(step + 1);

            setTimeout(() => {
                setSuccess(false);
                setStep(prevStep => prevStep + 1);
            }, 3000); // // Imprime el nuevo valor actualizado de step

        } catch (error) {
        }
        setIndicator(false)
    }


    const handleSubmitUpdate = async (values, { resetForm }) => {
        setIndicator(true)
        try {
            const storedToken = await SecureStore.getItemAsync('token');

            let data = {
                titulo: values.titulo,
                ingredientes: ingredientes.toString(),
                tiempo_preparacion: valueTime,
                descripcion: values.descripcion,
                categoria_id: valueCategory,
                num_personas: valuePersons,
            };

            if (image !== null) {
                data = {
                    ...data,
                    rutaImagenPrincipal: image,
                };
            }
            // resetFormValues()


            const headers = { Authorization: `Bearer ${storedToken}` };

            const response = await axios.put(`https://api-receptarium.david-pr.com/api/recetas/${idReceta}`, data, { headers });

            setSuccess(true);

            setStep(step + 1);


            setTimeout(() => {
                setSuccess(false);
                setStep(prevStep => prevStep + 1);


                if (parametro.parametro.pasos.length <= 0) {

                    navigation.navigate('VerReceta', idReceta)
                    navigation.setParams(null);
                    navigation.navigate('Mis recetas');
                    resetFormValues()
                    resetForm()

                }
            }, 3000); // // Imprime el nuevo valor actualizado de step

        } catch (error) {
        }
        setIndicator(false)
    }

    const handleSubmit = (values, { resetForm }) => {

        if (edit) {
            handleSubmitUpdate(values, { resetForm })
        } else {
            handleSubmitCreate(values, { resetForm })
        }

    };
    const manageSubmitStep = (value, values, { resetForm }) => {

        if (value == 0) {
            handleSubmitSteps(values, { resetForm })

        } else if (value == 1) {
            if (values.descripcion_paso.length == "" && values.titulo_paso.length == "") {
                navigation.navigate('VerReceta', idReceta)
            } else {
                if (values.descripcion_paso.length < 3) { timeOut(); return; }
                else if (values.titulo_paso.length < 3) { timeOut(); return; }

                handleSubmitSteps(values, { resetForm })
                navigation.navigate('VerReceta', idReceta)
            }

        } else if (value == 2) {

            navigation.navigate('VerReceta', idReceta)

        } else if (value == 3) {
            if (values.descripcion_paso.length < 3) { timeOut(); return; }
            else if (values.titulo_paso.length < 3) { timeOut(); return; }

            handleUpdateSteps(values, { resetForm })
        }
    }
    const handleUpdateSteps = async (values, { resetForm }) => {

        setIndicator(true)
        try {
            const storedToken = await SecureStore.getItemAsync('token');

            let data;
            if (imageStep == "") {

                data = {
                    titulo: values.titulo_paso,
                    descripcion: values.descripcion_paso,
                };
            } else {

                data = {
                    titulo: values.titulo_paso,
                    descripcion: values.descripcion_paso,
                    ruta_imagen: imageStep,
                };
            }

            const headers = { Authorization: `Bearer ${storedToken}` };

            const response = await axios.put('https://api-receptarium.david-pr.com/api/editar-paso/' + idPaso, data, { headers });

            if (parametro.parametro.pasos.length <= stepReceta) {
                navigation.setParams(null);
                navigation.navigate('Mis recetas');
                navigation.navigate('VerReceta', idReceta);
            }

            setSuccessStep(true);
            setSuccess(true);
            setTimeout(() => {
                setSuccessStep(false);
                setSuccess(false);
            }, 3000); // // Imprime el nuevo valor actualizado de step

            setStepReceta(stepReceta + 1);
            resetForm()
            setImage("");
            setImageStep("")
        } catch (error) {
        }
        setIndicator(false)

    };
    const handleSubmitSteps = async (values, { resetForm }) => {
        setIndicator(true)
        try {
            const storedToken = await SecureStore.getItemAsync('token');

            let data;
            if (imageStep == "") {

                data = {
                    titulo: values.titulo_paso,
                    descripcion: values.descripcion_paso,
                };
            } else {

                data = {
                    titulo: values.titulo_paso,
                    descripcion: values.descripcion_paso,
                    ruta_imagen: imageStep,
                };
            }

            const headers = { Authorization: `Bearer ${storedToken}` };

            const response = await axios.post('https://api-receptarium.david-pr.com/api/crear-pasos/' + idReceta, data, { headers });


            setSuccessStep(true);
            setSuccess(true);
            setTimeout(() => {
                setSuccessStep(false);
                setSuccess(false);
            }, 3000); // // Imprime el nuevo valor actualizado de step
            setStepReceta(stepReceta + 1);
            resetForm()

            setImage("");
            setImageStep("")
        } catch (error) {
        }
        setIndicator(false)

    };
    const removeImg = () => {
        setImage("")
    }
    const removeImgStep = () => {
        setImageStep("")
    }

    return (
        <View style={styles.container}>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                enableReinitialize={true}
                innerRef={formikRef}
            >
                {({ handleChange, handleBlur, handleSubmit, resetForm, values }) => (
                    <View>

                        {step === 1 &&
                            <View style={styles.containerCard} >
                                <Text style={styles.subheader}>Introducce el nombre de tu receta</Text>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={handleChange('titulo')}
                                    onBlur={handleBlur('titulo')}
                                    value={values.titulo}
                                    placeholder="Nombre de la receta"
                                />
                            </View>
                        }
                        {step === 2 &&
                            <View style={styles.containerCard}>
                                <Text style={styles.subheader}>Introduce los ingredientes</Text>
                                <View style={styles.containerIngre}>
                                    <TextInput
                                        style={styles.inputIngredient}
                                        onChangeText={setIngredienteActual}
                                        value={ingredienteActual}
                                        placeholder="Ejemplo: 100 gr de pollo"
                                    />
                                    <TouchableOpacity
                                        style={styles.buttonIngre}
                                        onPress={handelAdd}>
                                        <Text>+</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.ingContainer}>
                                    {ingredientes.map((ingrediente, index) => (
                                        <View style={styles.ingRow} key={index}>
                                            <Text style={styles.ing}>-{ingrediente}</Text>
                                            <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(index)}>
                                                <Text style={styles.txtBtnDelete}>-</Text>
                                            </TouchableOpacity>
                                        </View>
                                    ))}
                                </View>
                            </View>}
                        {step === 3 &&
                            <>
                                <Text style={styles.subheader}>Para cuantas personas?</Text>
                                <DropDownPersons
                                    onValueChange={setValuePersons}
                                    initialValue={valuePersons}
                                /></>}
                        {step === 4 &&
                            <>
                                <Text style={styles.subheader}>Describe el plato</Text>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={handleChange('descripcion')}
                                    onBlur={handleBlur('descripcion')}
                                    value={values.descripcion}
                                    placeholder="descripcion"
                                    multiline
                                />
                            </>}
                        {step === 5 &&
                            <>
                                <Text style={styles.subheader}>¿Quanto tiempo ?</Text>
                                <DropDownTime
                                    onValueChange={setValueTime}
                                    initialValue={valueTime}
                                /></>}

                        {step === 6 &&

                            <View style={styles.containerCard} >
                                <Text style={styles.subheader}>¿Quieres añadir una foto del plato?</Text>
                                <View style={styles.containerImgPre}>
                                    {image &&
                                        <>
                                            <TouchableOpacity onPress={removeImg} style={styles.trashImg}>
                                                <Text style={styles.iconsTrash}>🗑️</Text>
                                            </TouchableOpacity>
                                            <Image source={{ uri: image }} style={styles.imageReceta} />
                                        </>
                                    }

                                    <TouchableOpacity style={styles.buttonImg} onPress={pickImage}>
                                        <Text style={styles.textButton}>Seleccionar una imagen de tu galería</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        }
                        {step === 7 &&
                            <>
                                <Text style={styles.subheader}>Selecion una categoria</Text>
                                <DropDownCategory
                                    onValueChange={setValueCategory}
                                    initialValue={valueCategory}
                                />
                            </>}
                        {showToolTip && step < 10 ? <ToolTip text="Por favor, rellena los datos." onClose={() => setShowToolTip(false)} /> : ""}

                        {step <= 7 &&
                            <View style={styles.containerButton}>
                                <TouchableOpacity style={[styles.button, styles.buttonLeft]} onPress={handlepreviousStep}>
                                    <Text style={styles.textButton}>Anterior</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button} onPress={() => handleNextStep(values)}>
                                    <Text style={styles.textButton}>Siguiente</Text>
                                </TouchableOpacity>
                            </View>
                        }
                        {step == 8 &&
                            <View style={[styles.containerCard, styles.containerPreview]}>
                                <View style={styles.containerTitle}>
                                    <Text style={styles.tituloReceta}> {values.titulo}</Text>
                                    <Text style={styles.tituloCat} >{categorias[valueCategory - 1]}</Text>
                                </View>
                                {image ? <Image source={{ uri: image }} style={[styles.imageReceta, styles.imagenRecetaFinal]} /> : <View style={styles.imgGhost}></View>}
                                <View style={styles.containerPreview}>
                                    <Text >{values.descripcion}</Text>
                                    <View style={styles.container2}>
                                        <Text>Para {valuePersons} personas</Text>
                                        <Text style={styles.txtTime}>Tiempo :{valueTime}</Text>
                                    </View>
                                    <Text style={styles.align}>Ingredientes</Text>
                                </View>

                                <View style={styles.ingContainer}>

                                    {ingredientes.map((ingrediente, index) => (
                                        <Text style={styles.ing} key={index}>-{ingrediente}</Text>
                                    ))}
                                </View>
                                {edit == false ?

                                    indicator ? (
                                        <View >
                                            <ActivityIndicator size="large" color="#0000ff" />
                                        </View>
                                    ) : (
                                        <View style={styles.containerButtonSave}>
                                            <TouchableOpacity style={[styles.button]} onPress={handlepreviousStep}>
                                                <Text style={styles.textButton}>Anterior</Text>
                                            </TouchableOpacity>

                                            <TouchableOpacity style={styles.buttonSave} onPress={() => handleSubmit(values, { resetForm })}>
                                                <Text style={styles.textButton}>Guardar Receta</Text>
                                            </TouchableOpacity>

                                        </View>
                                    )
                                    : (
                                        indicator ? (
                                            <View >
                                                <ActivityIndicator size="large" color="#0000ff" />
                                            </View>
                                        ) : (
                                            <View style={styles.containerButtonSave}>
                                                <TouchableOpacity style={[styles.button]} onPress={handlepreviousStep}>
                                                    <Text style={styles.textButton}>Anterior</Text>
                                                </TouchableOpacity>

                                                <TouchableOpacity style={styles.buttonSave} onPress={() => handleSubmit(values, { resetForm })}>
                                                    <Text style={styles.textButton}>Actualizar Receta</Text>
                                                </TouchableOpacity>
                                            </View>
                                        )
                                    )
                                }
                            </View>
                        }
                    </View>
                )
                }
            </Formik >

            {edit == false && step == 10 &&
                < View >
                    <Text style={styles.subheader}>Quieres añadir pasos para elaborar tu receta?</Text>
                    <View style={styles.containerButton}>

                        <TouchableOpacity style={[styles.button, styles.buttonLeft]} onPress={() => handleId()}>
                            <Text style={styles.textButton}>No</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => handleNextStep()}>
                            <Text style={styles.textButton}>Si</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            }
            {edit == true && step == 10 &&
                < View >
                    <Text style={styles.subheader}>Quieres  editar lo pasos de tu receta?</Text>
                    <View style={styles.containerButton}>

                        <TouchableOpacity style={[styles.button, styles.buttonLeft]} onPress={() => handleId()}>
                            <Text style={styles.textButton}>No</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => handleNextStep()}>
                            <Text style={styles.textButton}>Si</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            }
            {step == 9 && <SuccessAnimation success={success} message={"Exito al guardar la receta"} />}
            {success && <SuccessAnimation success={successStep} message={"Exito al guardar el paso"} />}
            {
                step == 11 &&
                <View>
                    <Formik
                        initialValues={initialValues}
                        enableReinitialize={true}
                    >
                        {({ handleChange, handleBlur, handleSubmitSteps, values, resetForm }) => (

                            <View style={[styles.containerCard, styles.containerPreview]}>
                                {showToolTip && step == 11 ? <ToolTip text="Por favor, rellena los datos." onClose={() => setShowToolTip(false)} /> : ""}

                                <Text style={[styles.subheader, styles.subPreview]}>Paso {stepReceta}</Text>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={handleChange('titulo_paso')}
                                    onBlur={handleBlur('titulo_paso')}
                                    value={values.titulo_paso}
                                    placeholder="Titulo paso"

                                />

                                <TextInput
                                    style={styles.input}
                                    onChangeText={handleChange('descripcion_paso')}
                                    onBlur={handleBlur('descripcion_paso')}
                                    value={values.descripcion_paso}
                                    placeholder="Descripcion de los pasos "
                                    multiline={true}
                                />

                                {imageStep &&
                                    <>
                                        <TouchableOpacity onPress={removeImgStep} style={[styles.trashImg, styles.trashImgStep]}>
                                            <Text style={styles.iconsTrash}>🗑️</Text>
                                        </TouchableOpacity>
                                        <Image source={{ uri: imageStep }} style={styles.imageReceta} />
                                    </>
                                }
                                <TouchableOpacity style={styles.buttonImg} onPress={pickImageStep}>
                                    <Text style={styles.textButton}>Seleccionar una imagen de tu galería</Text>
                                </TouchableOpacity>
                                {edit === false && indicator && (
                                    <View>
                                        <ActivityIndicator size="large" color="#0000ff" />
                                    </View>
                                )}
                                {edit === false && !indicator && (
                                    <View style={styles.containerButton}>
                                        <TouchableOpacity style={[styles.button, styles.buttonLeft]} onPress={() => manageSubmitStep(1, values, { resetForm })}>
                                            <Text style={styles.textButton}>Finalizar</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.button} onPress={() => manageSubmitStep(0, values, { resetForm })}>
                                            <Text style={styles.textButton}>Añadir paso</Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                                {edit === true && indicator && (
                                    <View>
                                        <ActivityIndicator size="large" color="#0000ff" />
                                    </View>
                                )}
                                {edit === true && !indicator && (
                                    <View style={styles.containerButton}>
                                        <TouchableOpacity style={[styles.button, styles.buttonLeft]} onPress={() => manageSubmitStep(2, values, { resetForm })}>
                                            <Text style={styles.textButton}>Finalizar</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.button} onPress={() => manageSubmitStep(3, values, { resetForm })}>
                                            <Text style={styles.textButton}>Actualizar</Text>
                                        </TouchableOpacity>
                                    </View>
                                )}

                            </View>
                        )}

                    </Formik>


                </View>
            }
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 100,
        alignItems: 'center',
        backgroundColor: '#f582ae32',
        flex: 1,
    },
    containerCard: {
        width: 320
    },
    input: {
        height: 50,
        width: 280,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 40,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginLeft: 15
    },
    containerButton: {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        marginTop: 20
    },
    button: {
        width: 120,
        height: 45,
        backgroundColor: '#f582ae',
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    buttonSave: {
        width: 150,
        height: 45,
        backgroundColor: '#f582ae',
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 17,
        marginTop: 10

    },
    buttonLeft: {
        marginRight: 20

    },
    textButton: {
        fontWeight: 'bold',
        color: '#f6e3ea',
        fontSize: 18
    },
    subheader: {
        color: '#f582ae',
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 100,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 0
    },
    subPreview: {
        marginBottom: 30,
    },
    containerIngre: {
        flexDirection: 'row',

    },
    inputIngredient: {
        height: 40,
        width: 200,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginHorizontal: 20,
    },
    buttonIngre: {
        width: 40,
        height: 40,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#f582ae',
        alignItems: 'center',
        justifyContent: 'center',
    },
    ingContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 0
    },
    ing: {
        paddingHorizontal: 30
    },
    tituloReceta: {
        fontSize: 20,
        marginBottom: 20,
        marginTop: 10,
        paddingLeft: -30
    },
    containerReceta: {
        marginTop: -60
    },
    containerTitle: {
        flexDirection: 'row',
        marginHorizontal: 20,
        marginBottom: 20
    },
    tituloCat: {
        marginTop: 37,
        marginLeft: 7,
        position: 'absolute'
    },
    container2: {

        flexDirection: 'row',
        marginVertical: 10

    },
    txtTime: {
        marginLeft: 40
    },
    imageReceta: {
        width: 280,
        height: 180,
        marginHorizontal: 30,
        borderRadius: 10,
        marginLeft: 22,
    },

    containerButtonSave: {
        flexDirection: 'row',
        marginLeft: 18,
        marginTop: 20
    },
    align: {

        fontWeight: 'bold'
    },
    buttonImg: {
        width: 310,
        height: 45,
        backgroundColor: '#f582ae',
        borderRadius: 18,
        marginHorizontal: 5,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imagenRecetaFinal: {
        marginBottom: 90
    },
    imgGhost: {
        width: 280,
        height: 180,
    },

    containerImgPre: {
        marginTop: -60
    },
    trashImg: {
        backgroundColor: '#d44f4f',
        width: 40,
        height: 40,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 280,
        marginTop: -50,
        position: 'absolute'
    },
    trashImgStep: {
        marginTop: 204,
        marginLeft: 285,
        width: 35,
        height: 35,
    },
    iconsTrash: {
        fontSize: 23
    },
    containerPreview: {
        marginTop: -70,
        marginHorizontal: 20,
        marginBottom: 10

    },
    ingRow: {
        flexDirection: 'row',

    },
    deleteButton: {
        width: 20,
        height: 20,
        backgroundColor: 'red',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white'

    },
    txtBtnDelete: {
        color: 'white',
        fontSize: 30,
        marginTop: -12.5

    }
});

export default CrearReceta;
