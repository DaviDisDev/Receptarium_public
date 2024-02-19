import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const DropDownCategory = ({ onValueChange, initialValue }) => {
    const [open, setOpen] = React.useState(false);
    const [valueCategory, setValue] = React.useState(null);

    const items = [
        { label: 'Entrantes', value: 1 },
        { label: 'Plato Principal', value: 2 },
        { label: 'Guarniciones', value: 3 },
        { label: 'Postres', value: 4 }
    ];
    useEffect(() => {
        setValue(initialValue);
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
                placeholder="Selecciona una categoría"
                style={{ backgroundColor: '#ff9ec3', width: 270, borderColor: 'skyblue' }}
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
                    width: 270,

                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 50,
        paddingHorizontal: 24,

    }
});

export default DropDownCategory;
