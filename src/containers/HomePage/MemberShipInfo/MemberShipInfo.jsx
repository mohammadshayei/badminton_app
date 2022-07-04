import { useState } from "react";
import "./MemberShipInfo.scss"
import CreditBar from "../../../components/UI/CreditBar/CreditBar";
import { useTheme } from "../../../styles/ThemeProvider";
import { Icon } from '@iconify/react';

const MemberShipInfo = ({ tournament }) => {
    const [pricing, setPricing] = useState([
        {
            days: 3,
            price: "3,600,000",
            hover: false,
            disabled: false
        },
        {
            days: 4,
            price: "4,800,000",
            hover: false,
            disabled: true
        },
        {
            days: 7,
            price: "8,400,000",
            newPrice: "7,000,000",
            hover: false,
            disabled: true
        }
    ]);
    const [paymentHistory, setPaymentHistory] = useState([
        {
            date: "1401/05/19",
            description: "4 روز",
            price: "4,000,000 تومان"
        }
    ]);


    const themeState = useTheme();
    const theme = themeState.computedTheme;

    const tournamentDays = 7,
        tournamentPaidDays = 4,
        pastDays = 1;

    return <div className="membership-info-container">
        <div className="tournament-section">
            <div className="tournament-title"
                style={{ color: theme.primary }}
            >لیگ برتر بدمینتون ایران جام خلیج فارس</div>
            <CreditBar
                days={tournamentDays}
                paid={tournamentPaidDays}
                past={pastDays}
                showDetail={true}
                style={{
                    justifyContent: "center"
                }}
            />
        </div>
        <div className="payment-section">
            <div className="pricing-container">
                {pricing.map((price, idx) =>
                    <div
                        key={idx}
                        disabled={price.disabled}
                        className="pricing-box"
                        style={{
                            backgroundColor: idx === pricing.length - 1 ? theme.secondary : theme.surface,
                            color: idx === pricing.length - 1 ? theme.on_secondary : theme.on_surface
                        }}
                    >
                        {idx === pricing.length - 1 &&
                            <div className="ribbon" >
                                <span style={{ backgroundColor: theme.error }}>
                                    پیشنهاد ویژه
                                </span>
                            </div>}
                        <p className="days">{`${price.days} روز`}</p>
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
                        <p>تاریخ</p>
                        <p>شرح</p>
                        <p>قیمت</p>
                    </div>
                    {paymentHistory.map((item, i) => {
                        return (
                            <div className="history-row"
                                key={i}
                                style={{
                                    color: theme.primary
                                }}
                            >
                                <p>{item.date}</p>
                                <p>{item.description}</p>
                                <p>{item.price}</p>
                            </div>)
                    })}
                </div>

            </div>
        </div>
    </div >;
};

export default MemberShipInfo;
