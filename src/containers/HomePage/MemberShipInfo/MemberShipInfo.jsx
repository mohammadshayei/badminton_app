/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import "./MemberShipInfo.scss"
import CreditBar from "../../../components/UI/CreditBar/CreditBar";
import { useTheme } from "../../../styles/ThemeProvider";
import { Icon } from '@iconify/react';
import CustomInput, { elementTypes } from "../../../components/UI/CustomInput/CustomInput";
import { stringFa } from "../../../assets/strings/stringFaCollection";
import { separatorComma } from "../../../utils/funcs";
import { dynamicApi } from "../../../api/home";
import { useSelector } from "react-redux";
import ErrorDialog from "../../../components/UI/Error/ErrorDialog";
import Loading from "../../../components/UI/Loading/Loading";

const MemberShipInfo = ({ data, setData, teamId, setDialog }) => {
    const [pricing, setPricing] = useState([]);
    const [paymentHistory, setPaymentHistory] = useState([]);
    const [tournaments, setTournaments] = useState([]);
    const [selectedTournament, setSelectedTournament] = useState({ value: "", id: "" })
    const [loading, setLoading] = useState(false)

    const themeState = useTheme();
    const theme = themeState.computedTheme;

    const { token } = useSelector(state => state.auth)

    const onChangeTournament = async (e) => {
        setDialog(null)
        setSelectedTournament({ id: e.id, value: e.text })
        try {
            const fetchedData = await dynamicApi({ teamId, tournamentId: e.id }, token, 'get_tournament_team_info')
            if (!fetchedData.success) {
                setDialog(<ErrorDialog type="error">{fetchedData.data.message}</ErrorDialog>)
                setLoading(false)
                return;
            }
            setData({ ...data, ...fetchedData.data.data })
            setLoading(false)
        } catch (error) {
            setLoading(false)
            setDialog(<ErrorDialog type="error">{stringFa.error_occured}</ErrorDialog>)

        }
    }

    const onItemClick = async (info) => {
        setDialog(null)
        try {
            let payload = {
                tournamentId: selectedTournament.id,
                accountCodeId: teamId,
                descriptionArticle: `خرید پکیج ${info.days} روزه`,
                debtor: 0,
                creditor: info.price.replace(/,/gi, "", true),
                dayCount: info.days
            }
            const result = await dynamicApi(payload, token, 'create_document')
            if (!result.success) {
                setDialog(<ErrorDialog type="error">{result.data.message}</ErrorDialog>)
                return;
            }
            window.location.replace(result.data.url)
        } catch (error) {
            setDialog(<ErrorDialog type="error">{stringFa.error_occured}</ErrorDialog>)

        }
    }

    useEffect(() => {
        if (!data) return;
        setTournaments(data.tournaments.map(item => {
            return {
                id: item.tournament._id,
                text: item.tournament.title,
            }
        }))
    }, [data?.tournaments])
    useEffect(() => {
        if (!data) return;
        setSelectedTournament({
            value: data.selectedTournament.title,
            id: data.selectedTournament._id
        })
    }, [data?.selectedTournament])
    useEffect(() => {
        if (!data) return;
        setLoading(true)
        let updatedPricing = [
            {
                days: data.days % 2 === 0 ? data.days / 2 : (data.days - 1) / 2,
                price: separatorComma((data.days % 2 === 0 ? data.days / 2 : (data.days - 1) / 2) * 1200000),
                hover: false,
                disabled: false
            },
            {
                days: data.days % 2 === 0 ? data.days / 2 : (data.days + 1) / 2,
                price: separatorComma((data.days % 2 === 0 ? data.days / 2 : (data.days + 1) / 2) * 1200000),
                hover: false,
                disabled: false
            },
            {
                days: data.days,
                price: separatorComma(data.days * 1200000),
                newPrice: separatorComma(data.days * 1000000),
                hover: false,
                disabled: false
            }
        ]
        if (data.paid === data.days) {
            updatedPricing[0].disabled = true;
            updatedPricing[1].disabled = true;
            updatedPricing[2].disabled = true;
        } else if (data.paid === 0) {
            updatedPricing[0].disabled = false;
            updatedPricing[1].disabled = false;
            updatedPricing[2].disabled = false;
        } else if (data.days % 2 === 0) {
            updatedPricing[0].disabled = true;
            updatedPricing[1].disabled = false;
            updatedPricing[2].disabled = true;
        } else {
            if ((data.days + 1) / 2 === data.paid) {
                updatedPricing[0].disabled = false;
                updatedPricing[1].disabled = true;
                updatedPricing[2].disabled = true;
            } else {
                updatedPricing[0].disabled = true;
                updatedPricing[1].disabled = false;
                updatedPricing[2].disabled = true;
            }
        }
        setLoading(false)
        setPricing(updatedPricing)
    }, [data?.paid, data?.days])

    useEffect(() => {
        if (!data) return;
        setPaymentHistory(data.docs.map(item => {
            return {
                date: new Date(item.date).toLocaleDateString('fa-IR'),
                description: item.description,
                price: separatorComma(item.creditor),
                _id: item._id
            }
        }))
    }, [data?.docs])

    return <div className="membership-info-container">
        <div className="tournament-section">
            <div className="tournament-title"
                style={{ color: theme.primary }}
            >
                <CustomInput
                    elementType={elementTypes.dropDown}
                    items={tournaments ? tournaments : []}
                    onChange={onChangeTournament}
                    value={selectedTournament.value}
                />
            </div>
            {data && <CreditBar
                days={data?.days}
                paid={data?.paid}
                past={data?.past}
                dates={data?.pastDate}
                showDetail={true}
                style={{
                    justifyContent: "center"
                }}
            />}
        </div>
        {loading ?
            <Loading /> :
            <div className="payment-section">
                {pricing.length > 0 &&
                    <div className="pricing-container">
                        {pricing.map((price, idx) =>
                            <div
                                key={idx}
                                disabled={price.disabled}
                                className="pricing-box"
                                onClick={() => onItemClick(price)}
                                style={{
                                    backgroundColor: idx === pricing.length - 1 ? theme.secondary : theme.surface,
                                    color: idx === pricing.length - 1 ? theme.on_secondary : theme.on_surface
                                }}
                            >
                                {idx === pricing.length - 1 &&
                                    <div className="ribbon" >
                                        <span style={{ backgroundColor: theme.error }}>
                                            {stringFa.special_offer}
                                        </span>
                                    </div>}
                                <p className="days">{`${price.days} ${stringFa.day}`}</p>
                                {price.newPrice &&
                                    <p className='price old'
                                        style={{
                                            color: idx === pricing.length - 1 ?
                                                theme.on_secondary :
                                                theme.on_surface
                                        }}
                                    >{`${price.price} تومان`}</p>
                                }
                                <p className="price"
                                    style={{
                                        color: idx === pricing.length - 1 ? theme.on_secondary : theme.secondary
                                    }}
                                >{`${price.newPrice ? price.newPrice : price.price} تومان`}</p>
                                <Icon
                                    className="pricing-icon"
                                    icon="ic:round-navigate-next"
                                    hFlip={true}
                                    color={idx === pricing.length - 1 ? theme.on_secondary : theme.primary}
                                />
                            </div>
                        )}
                        <p>توجه : %9 مالیات بر ارزش افزوده به قیمت ها اضافه می‌شود.</p>
                        <div className="subscription-details">
                            <Icon
                                icon="akar-icons:check"
                                color={theme.primary}
                            />
                            <p>شرکت در لیگ به عنوان میزبان</p>
                        </div>
                        <div className="subscription-details">
                            <Icon
                                icon="akar-icons:check"
                                color={theme.primary}
                            />
                            <p>پشتیبانی فنی</p>
                        </div>
                    </div>
                }
                <div className="history-container"
                    style={{
                        backgroundColor: theme.surface,
                        color: theme.on_surface
                    }}
                >
                    <div className="history-table">
                        <div className="history-header"
                            style={{
                                borderColor: theme.border_color
                            }}
                        >
                            <p>{stringFa.date}</p>
                            <p>{stringFa.description}</p>
                            <p>{stringFa.price}</p>
                        </div>
                        {paymentHistory.length > 0 ? paymentHistory.map((item, i) => {
                            return (
                                <div className="history-row"
                                    key={i}
                                    style={{
                                        color: theme.error
                                    }}
                                >
                                    <p>{item.date}</p>
                                    <p>{item.description}</p>
                                    <p>{item.price}</p>
                                </div>)
                        })
                            : <div className="history-row">
                                موردی وجود ندارد
                            </div>
                        }
                    </div>

                </div>
            </div>}
    </div >;
};

export default MemberShipInfo;
