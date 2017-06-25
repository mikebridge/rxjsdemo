import * as React from "react";
import {
    Card, CardActions, CardText, CardTitle, RaisedButton
} from "material-ui";
import * as Rx from "rxjs";

import {
    deepOrange300, grey500, purple500, red500, white, green500, blue500,
    orange500
} from "material-ui/styles/colors";
import {appendToLog, IMessage, Logs} from "../logging/log";

interface ICounterProps {
    start: number;
    increment: number;
}

interface ICounterState {
    current: number;
    log: IMessage[];
}

export class Counter extends React.Component<ICounterProps, ICounterState> {

    interval$ = Rx.Observable.interval(1000).mapTo(-1);
    //timer$ = Rx.Observable.timer(1000, 1000)
     //   .map(tick => 77 - tick)
    //    .take(77 + 1);
        //.subscribe(tick => console.log(tick));

    startClick$ = new Rx.Subject(); //.mapTo(Rx.Observable.of(false));
    stopClick$ = new Rx.Subject();  //.mapTo(this.interval$);
    //toggleSubject$ = new Rx.Subject();

    constructor(props: ICounterProps) {
        super(props);
        this.state = {
            current: this.props.start,
            log: []
        };
        this.setCounter = this.setCounter.bind(this);
        this.addLogMessage = this.addLogMessage.bind(this);
        this.clearLogs = this.clearLogs.bind(this);
        //this.cleanup = this.cleanup.bind(this);
    }

    createLog(message: string, backgroundColor?: string, color?: string): IMessage {
        return {
            message,
            color,
            backgroundColor,
            timestamp: new Date()
        };
   }


    componentDidMount() {
        //this.interval$.subscribe(x => this.setCounter(x));
        //this.timer$.subscribe(x => this.setCounter(x));
        //this.startClick$.subscribe((x: string) => this.addLogMessage(x));
        //this.stopClick$.subscribe((x: string) => this.addLogMessage(x));

        const timer$ = Rx.Observable
            //.merge(this.stopClick$.mapTo(Rx.Observable.of(false)), this.startClick$.mapTo(this.interval$))
            .merge(this.stopClick$.mapTo(Rx.Observable.empty<number>()),
                   this.startClick$.mapTo(this.interval$))
            //.merge(this.stopClick$.mapTo(-1), this.startClick$.mapTo(2))

            .do((x: any) => this.addLogMessage(this.createLog(`Merge ${JSON.stringify(x)}`, red500)))
            .startWith(this.interval$)
            .do((x: any) => this.addLogMessage(this.createLog(`StartWith ${JSON.stringify(x)}`, green500)))
            .switchMap((val: any) => val)
            .do((x: string) => this.addLogMessage(this.createLog(`SwitchMap ${x}`, blue500)))
            .scan((acc: number, curr: number) => curr + acc, this.props.start)
            .do((x: string) => this.addLogMessage(this.createLog(`Scan ${x}`, orange500)))
            .subscribe((x: number) => this.setCounter(x));

    }

    componentWillUnmount() {
        //this.startClick$.
        //this.interval$.
        //this.timer$.unsubscribe()
    }

    clearLogs() {
        this.setState((state) => state.log = []);
        //this.interval$.complete();
    }

    public render(): JSX.Element {
        const src = "https://www.learnrxjs.io/operators/transformation/switchmap.html" +
            "#example-4-countdown-timer-with-switchmap";

        // const startClick$ = Rx.Observable
        //     .fromEvent(this.startButton, "click");

        return (
            <div>
                <Card>
                    <CardTitle title="RxJS Demo" subtitle="Counter"/>

                    <CardText>
                        <div id="counter">
                            {this.state.current}
                        </div>

                    </CardText>
                    <CardActions>
                        <RaisedButton label="Start" onClick={() => this.startClick$.next(true)} />;
                        <RaisedButton label="Stop"  onClick={() => this.stopClick$.next(false)} />

                    </CardActions>
                </Card>
                <div id="log">
                    <Logs messages={this.state.log} handleClear={() => this.clearLogs()}/>
                </div>
                <a target="_blank" href={src}>see also...</a>
                <hr />

            </div>
        );
    }

    private setCounter(value: number) {
        this.setState((state) => state.current = value);
    }


    private addLogMessage(message: IMessage) {
        // todo: abstract this better
        this.setState(appendToLog(message, (state) => state.log));
    }
}

//export default injectIntl(Counter);
export default Counter;

