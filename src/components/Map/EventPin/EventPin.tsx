import * as React from "react";

/* UI */
import { Popover, Card } from "antd";

/* Components */
import { EventPinProps } from "./EventPin.interfaces";

/* Services */

/* Styles */
import "./_event-pin.scss";

const { Meta } = Card;

interface State {
  readonly open: boolean;
  readonly class: string;
}

export class EventPin extends React.Component<EventPinProps, State> {
  readonly state: State = {
    open: false,
    class: "",
  };

  componentDidMount() {
    if (!this.props.event) return;
  }

  render() {
    const { event } = this.props;
    const content = (
      <Card
        style={{ width: 286 }}
        className="event-pin__hover"
        bordered={false}
        cover={<img src={``} />}
        actions={[]}
      >
        <Meta title={event.title} description="This is the description" />
      </Card>
    );

    return (
      <Popover content={content} trigger="hover">
        <div className="event-pin">
          <img
            className={"event-pin__icon " + this.state.class}
            src={``}
            alt=""
          />
        </div>
      </Popover>
    );
  }
}
