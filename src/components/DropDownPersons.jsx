import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const DropDownPersons = ({ onValueChange, initialValue }) => {
    const [open, setOpen] = React.useState(false);
    const [valueCategory, setValue] = React.useState(initialValue);

    const items = [
        { label: 1, value: 1 },
        { label: 2, value: 2 },
        { label: 3, value: 3 },
        { label: 4, value: 4 },
        { label: 5, value: 5 },
        { label: 6, value: 6 },
        { label: 7, value: 7 },
        { label: 8, value: 8 },
        { label: 9, value: 9 },
        { label: 10, value: 10 },
        { label: 11, value: 11 },
        { label: 12, value: 12 },
        { label: 13, value: 13 },
        { label: 14, value: 14 },
    ];
    useEffect(() => {

        setValue(initialValue); // Actualizar el valor seleccionado cuando cambie el valor inicial recibido por parámetro
    }, [initialValue]);

    const handleValueChange = (value) => {
        setValue(value);
        onValueChange(value);
    };

    return (
        <View style={styles.container}>
            <DropDownPicker
                open={open}
                value={valueCategory}
                items={items}
                setOpen={setOpen}
                setValue={handleValueChange}
                placeholder="Elige el numero de personas"
                containerStyle={{ height: 40, width: 250 }}
                style={{ backgroundColor: '#ff9ec3', width: 280, borderColor: 'skyblue' }}
                listItemContainerStyle={{
                    borderBottomWidth: 2,
                    borderColor: 'white',

                }}

                textStyle={{
                    color: "#f6e3ea",
                    fontWeight: 'bold',
                    fontSize: 19
                }}
                placeholderStyle={{
                    color: "#f6e3ea",
                    fontWeight: 'bold',
                    fontSize: 17

                }}


                dropDownContainerStyle={{
                    backgroundColor: '#ff9ec3',
                    borderColor: 'skyblue',
                    width: 280,

                }}


            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 50,
        marginLeft: -8


    }
});

export default DropDownPersons;
