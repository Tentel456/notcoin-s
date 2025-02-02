import React, {FC, useEffect, useState} from 'react';
import Cell from "../../../../components/Cell/Cell";
import IconText from "../../../../components/IconText/IconText";
import Img from "../../../../components/Img/Img";
import Icon16Chevron from "../../../../assets/icons/Icon16Chevron";
import './MyTeamButton.css';
import {useNavigate} from "react-router-dom";
import {ROUTE_TEAM, ROUTE_TEAMS} from "../../../../routes";
import {useDispatch, useSelector} from "react-redux";
import {DefaultStateType, getDispatchObject, SET_TEAM, TeamUserType} from "../../../../store/reducer";
import {formatNumberWithSpaces} from "../../../../utils/mathUtils";
import {Skeleton} from "@nextui-org/react";
import {getImageUrl} from "../../../../utils/api";
import {useTranslation} from "react-i18next";
import LetterAvatar from "../../../../components/LetterAvatar/LetterAvatar";

interface MyTeamButtonProps {

}

const MyTeamButton: FC<MyTeamButtonProps> = ({}) => {

    const navigate = useNavigate();
    const { t } = useTranslation();

    const team = useSelector((selector: DefaultStateType) => selector.team);

    return (
        <>
            {team === null && (
                <Skeleton
                    style={{
                        width: '100%',
                        height: 80,
                        borderRadius: 16,
                    }}
                />
            )}

            {team !== null && (
                <div className="MyTeamButton--container">
                    {team !== 'no' && team && (
                        <>
                            <Cell
                                title={team.name}
                                before={
                                    team.image ? (
                                        <Img src={getImageUrl(team.image)} />
                                    ) : (
                                        <LetterAvatar width={48} height={48} />
                                    )
                                }
                                after={<Icon16Chevron/>}
                                onClick={() => navigate(ROUTE_TEAM)}
                            >
                                <IconText
                                    size="small"
                                    imgPath={require('../../../../assets/images/coins/rocket_coin_back_36x36.png')}
                                    text={formatNumberWithSpaces(team.gold)}
                                />
                            </Cell>
                        </>
                    )}

                    {team === 'no' && (
                        <div
                            className="MyTeamButton--join"
                            onClick={() => navigate(ROUTE_TEAMS)}
                        >
                            <p>{t('teamJoinButton')}</p>
                            <Icon16Chevron/>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default MyTeamButton;