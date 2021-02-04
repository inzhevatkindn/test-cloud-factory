import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { ITicker } from '../../stores/quotes';
import { AnimatedCell } from './AnimatedCell';

interface IProps {
    keys: string[];
    data: ITicker[] | undefined;
    hasError: boolean;
}

const ErrorNotification = () => {
    return (
        <View style={styles.error}>
            <Text style={styles.headerText}>Error</Text>
        </View>
    )
}

export const Table = (props: IProps) => {
    const { keys, data, hasError } = props;

    const renderItem = ({ item }: any) => {
        return (
            <View style={styles.item}>
                <View style={styles.text}><Text style={styles.title}>{item.name}</Text></View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    {keys.map((key: string) => <AnimatedCell text={item[key]} key={key} />)}
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                {keys.map((key: string) => <View style={styles.text} key={key}>
                    <Text style={styles.headerText}>{key}</Text>
                </View>)}
            </View>
            {hasError 
                ? <ErrorNotification />
                : <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={item => item.id?.toString()}
                />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        flex: 1,
        alignItems: 'center'
    },
    error: {
        backgroundColor: '#d07684',
        alignItems: 'center',
        padding: 10
    },
    container: {
        padding: 20,
    },
    header: {
        backgroundColor: 'black',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    headerText: {
        color: 'white',
        fontWeight: 'bold'
    },
    item: {
        backgroundColor: '#f5f5f5',
        paddingVertical: 5,
        borderWidth: 1
    },
    title: {
        fontSize: 16,
        marginBottom: 5,
        fontWeight: 'bold'
    }
});