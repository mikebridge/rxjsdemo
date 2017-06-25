
import {
    Avatar, RaisedButton, Table, TableBody, TableHeader, TableHeaderColumn, TableRow,
    TableRowColumn
} from "material-ui";
import * as shortid from "shortid";
import * as React from "react";
import {grey500, white} from "material-ui/styles/colors";
export interface IMessage {
    message: string;
    timestamp: Date;
    color?: string;
    backgroundColor?: string;
}

export const appendToLog = (message: IMessage, fn: (state: any) => IMessage[]) => {
    const logLength = 30;
    return (state: any) => {
        const log: IMessage[] = state.log.length > logLength ? state.log.slice(1, logLength) : state.log;
        state.log = [...log, message];
    };
};


export const LogEntry = ({log}: {log: IMessage})  => {
    const style = {margin: 5};
    return (
        <TableRow >
            {/*<TableRowColumn>{timestamp.toLocaleString()}</TableRowColumn>*/}
            <TableRowColumn>
                <Avatar
                    style={style}
                    color={log.color || white}
                    backgroundColor={log.backgroundColor || grey500}>
                    {log.message[0]}
                </Avatar>
                {log.message}</TableRowColumn>
        </TableRow>
    );
};

interface ILogMessages {
    messages: IMessage[];
    handleClear: () => void;
}

export const Logs = ({messages, handleClear}: ILogMessages) => {
    const logEntries = messages.map(msg => <LogEntry key={shortid.generate()} log={msg} />);
    return (

        <Table >
            <TableHeader displaySelectAll={false}>
                <TableRow>
                    <TableHeaderColumn>
                        <RaisedButton label="Clear Logs" onClick={() => handleClear()} />
                    </TableHeaderColumn>

                </TableRow>
            </TableHeader>
            <TableBody>
                {logEntries}
            </TableBody>

        </Table>

    );
};
