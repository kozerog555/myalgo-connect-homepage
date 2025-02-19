import React, { Fragment, MouseEvent, ReactElement, useState, useEffect } from "react";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle, FormGroup, Label } from "reactstrap";

interface SenderDropdownProps {
    disabled?: boolean;
    onSelectSender(sender: string): void;
    accounts: any[]
}

export default function SenderDropdown(props: SenderDropdownProps): JSX.Element {
    const account = props.accounts && props.accounts.length > 0 ? props.accounts[0] : { name: "No wallet loaded" }
    const [sender, setSender] = useState(account);
    const [isOpen, openDropdown] = useState(false);

    useEffect(() => {
        if(props.accounts.length > 0 ){
            props.onSelectSender(props.accounts[0].address);
        }
    }, []);

    const onToggleSender = (event: MouseEvent) => {
        event.preventDefault();
        openDropdown(!isOpen);
    }

    const onSelectSender = (account: any) => {
        setSender(account);
        props.onSelectSender(account.address);
    }

    return <Fragment>
        <FormGroup className="align-items-center">
            <Label className="tx-label">
                From
            </Label>
            <Dropdown
                disabled={props.disabled || !props.accounts || props.accounts.length === 0}
                className="from-dropdown"
                isOpen={isOpen}
                toggle={onToggleSender}>
                <DropdownToggle caret disabled={props.disabled}>
                    <span className="text-ellipsis">
                        {sender ? sender.name : "No account loaded"}
                    </span>
                </DropdownToggle>
                <DropdownMenu>
                    {props.accounts && props.accounts.map((account): ReactElement => {
                        return (
                            <DropdownItem
                                onClick={() => onSelectSender(account)}
                                key={`account-${account.address}`}
                            >
                                <span className="text-ellipsis">
                                    {account.name}
                                </span>
                            </DropdownItem>
                        );
                    })
                    }
                </DropdownMenu>
            </Dropdown>
        </FormGroup>
    </Fragment>
}