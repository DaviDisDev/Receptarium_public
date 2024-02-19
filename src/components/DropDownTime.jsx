import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const DropDownTime = ({ onValueChange, initialValue }) => {
    const [open, setOpen] = React.useState(false);
    const [valueTime, setValue] = React.useState(null);

    const items = [
        { label: '15 min', value: '15 min' },
        { label: '30 min', value: '30 min' },
        { label: '45 min', value: '45 min' },
        { label: '1h', value: '1h' },
        { label: '1h 15 min', value: '1h 15 min' },
        { label: '1h 30 min', value: '1h 30 min' },
        { label: '1h 45 min', value: '1h 45 min' },
        { label: '2h', value: '2h' },
        { label: '2h 15 min', value: '2h 15 min' },
        { label: '2h 30 min', value: '2h 30 min' },
        { label: '2h 45 min ', value: '2h 45 min ' },
        { label: '3h', value: '3h' },
        { label: '3h 15 min ', value: '3h 15 min ' },
        { label: '3h 30 min ', value: '3h 30 min' },
        { label: '3h 45 min ', value: '3h 45 min' },
        { label: '4h', value: '4h' }
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
                value={valueTime}
                items={items}
                setOpen={setOpen}
                setValue={handleValueChange}
                placeholder="Elige el tiempo de preparacion"
                containerStyle={{ height: 40 }}
                style={{ backgroundColor: '#ff9ec3', width: 280, borderColor: 'skyblue' }}
                listContainerStyle={{ backgroundColor: '#ff9ec3' }}

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
        marginHorizontal: 16,
    }
});

export default DropDownTime;
