import "./Overview.scss"
import { useTheme } from "../../../../../styles/ThemeProvider.js";
import { SingleEliminationBracket, Match, MATCH_STATES, SVGViewer, createTheme } from '@g-loot/react-tournament-brackets';
import { useEffect, useState } from 'react';

function useWindowSize() {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
    });
    useEffect(() => {
        // Handler to call on window resize
        function handleResize() {
            // Set window width/height to state
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }
        // Add event listener
        window.addEventListener("resize", handleResize);
        // Call handler right away so state gets updated with initial window size
        handleResize();
        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount
    return windowSize;
}

const Overview = () => {

    const size = useWindowSize();
    const finalWidth = size.width;
    const finalHeight = size.height - 120;

    const themeState = useTheme();
    const theme = themeState.computedTheme;

    const CostumeTheme = createTheme({
        textColor: { main: theme.on_surface, highlighted: theme.on_surface, dark: theme.darken_border_color },
        matchBackground: { wonColor: theme.darken_border_color, lostColor: theme.border_color },
        score: {
            background: { wonColor: theme.background_color, lostColor: theme.background_color },
            text: { highlightedWonColor: theme.secondary, highlightedLostColor: theme.error },
        },
        border: {
            color: theme.border_color,
            highlightedColor: theme.secondary,
        },
        roundHeader: { backgroundColor: theme.secondary, fontColor: theme.on_secondary },
        connectorColor: theme.darken_border_color,
        connectorColorHighlight: theme.secondary,
        svgBackground: theme.background_color,
    });

    return (
        <div className="tournament-overview-container">
            <SingleEliminationBracket
                matches={matches}
                matchComponent={Match}
                theme={CostumeTheme}
                options={{
                    style: {
                        roundHeader: {
                            backgroundColor: CostumeTheme.roundHeader.backgroundColor,
                            fontColor: CostumeTheme.roundHeader.fontColor,
                        },
                        connectorColor: CostumeTheme.connectorColor,
                        connectorColorHighlight: CostumeTheme.connectorColorHighlight,
                    },
                }}
                svgWrapper={({ children, ...props }) => (
                    <SVGViewer
                        background={CostumeTheme.svgBackground}
                        SVGBackground={CostumeTheme.svgBackground}
                        width={finalWidth}
                        height={finalHeight}
                        {...props}
                    >
                        {children}
                    </SVGViewer>
                )}
            />
        </div>
    )
}

export default Overview

export const matches = [
    {
        id: 19876,
        name: 'Round 4 - Match 1',
        name: 'Final - Match',
        nextLooserMatchId: null,
        nextMatchId: null,
        participants: [
            {
                id: '059743f7-9501-471e-8f9e-2d1032eccc67',
                isWinner: false,
                name: 'محمد پایروند',
                picture: null,
                resultText: '',
                status: null
            }
        ],
        startTime: '2021-05-30',
        state: 'DONE',
        tournamentRoundText: '4'
    },
    {
        id: 19877,
        name: 'Semi Final - Match 1',
        nextLooserMatchId: null,
        nextMatchId: 19876,
        participants: [
            {
                id: 'acf45434-78a1-4907-bf19-92235d180e8b',
                isWinner: false,
                name: 'مهران شهبازی',
                picture: null,
                resultText: '',
                status: null
            },
            {
                id: '6d9ec9e8-d10d-424b-a00f-2078d4e08d39',
                isWinner: false,
                name: 'علی علیزاده',
                picture: 'teamlogos/client_team_default_logo',
                resultText: '',
                status: null
            }
        ],
        startTime: '2021-05-30',
        state: 'DONE',
        tournamentRoundText: '3'
    },
    {
        id: 19884,
        name: 'Semi Final - Match 2',
        nextLooserMatchId: null,
        nextMatchId: 19876,
        participants: [
            {
                id: '059743f7-9501-471e-8f9e-2d1032eccc67',
                isWinner: true,
                name: 'محمد پایروند',
                picture: null,
                resultText: 'Won',
                status: 'PLAYED'
            },
            {
                id: '51c449a7-fb04-445a-b478-1ca95feeeafa',
                isWinner: false,
                name: 'علیرضا کرمی',
                picture: null,
                resultText: 'Lost',
                status: 'PLAYED'
            }
        ],
        startTime: '2021-05-30',
        state: 'SCORE_DONE',
        tournamentRoundText: '3'
    },
    {
        id: 19878,
        name: 'Round 2 - Match 1',
        nextLooserMatchId: null,
        nextMatchId: 19877,
        participants: [
            {
                id: 'a552ca06-579d-41ee-9405-4cedd187c5bf',
                isWinner: false,
                name: 'بهمن چگینی نکو',
                picture: null,
                resultText: '1',
                status: MATCH_STATES.PLAYED
            },
            {
                id: '6d9ec9e8-d10d-424b-a00f-2078d4e08d39',
                isWinner: true,
                name: 'علی علیزاده',
                picture: 'teamlogos/client_team_default_logo',
                resultText: '2',
                status: MATCH_STATES.PLAYED
            }
        ],
        startTime: '2021-05-30',
        state: 'DONE',
        tournamentRoundText: '2'
    },
    {
        id: 19881,
        name: 'Round 2 - Match 2',
        nextLooserMatchId: null,
        nextMatchId: 19877,
        participants: [
            {
                id: 'acf45434-78a1-4907-bf19-92235d180e8b',
                isWinner: true,
                name: 'مهران شهبازی',
                picture: null,
                resultText: 'Won',
                status: 'PLAYED'
            },
            {
                id: 'fdce979a-002e-4906-a80f-d161f108bcde',
                isWinner: false,
                name: 'میلاد شهابی نژاد',
                picture: 'teamlogos/client_team_default_logo',
                resultText: 'Lost',
                status: 'PLAYED'
            }
        ],
        startTime: '2021-05-30',
        state: 'SCORE_DONE',
        tournamentRoundText: '2'
    },
    {
        id: 19885,
        name: 'Round 2 - Match 3',
        nextLooserMatchId: null,
        nextMatchId: 19884,
        participants: [
            {
                id: 'c7a2ec6b-389f-429d-819e-53594e94d475',
                isWinner: false,
                name: 'کامبیز جعفری',
                picture: 'teamlogos/client_team_default_logo',
                resultText: 'Lost',
                status: 'PLAYED'
            },
            {
                id: '059743f7-9501-471e-8f9e-2d1032eccc67',
                isWinner: true,
                name: 'محمد پایروند',
                picture: null,
                resultText: 'Won',
                status: 'PLAYED'
            }
        ],
        startTime: '2021-05-30',
        state: 'SCORE_DONE',
        tournamentRoundText: '2'
    },
    {
        id: 19888,
        name: 'Round 2 - Match 4',
        nextLooserMatchId: null,
        nextMatchId: 19884,
        participants: [
            {
                id: 'ce914b1b-fe1e-4be9-8409-681049265614',
                isWinner: false,
                name: 'محسن معصومی',
                picture: 'teamlogos/client_team_default_logo',
                resultText: 'Lost',
                status: 'PLAYED'
            },
            {
                id: '51c449a7-fb04-445a-b478-1ca95feeeafa',
                isWinner: true,
                name: 'علیرضا کرمی',
                picture: null,
                resultText: 'Won',
                status: 'PLAYED'
            }
        ],
        startTime: '2021-05-30',
        state: 'SCORE_DONE',
        tournamentRoundText: '2'
    },
    {
        id: 19879,
        name: 'Round 1 - Match 1',
        nextLooserMatchId: null,
        nextMatchId: 19878,
        participants: [
            {
                id: 'bcbe20a3-82b5-4818-bb29-4c1149e9f04e',
                isWinner: false,
                name: 'آرمین مدیری',
                picture: 'teamlogos/px6aikyzeej5vhecturj',
                resultText: 'WO',
                status: MATCH_STATES.WALK_OVER
            },
            {
                id: 'a552ca06-579d-41ee-9405-4cedd187c5bf',
                isWinner: true,
                name: 'بهمن چگینی نکو',
                picture: null,
                resultText: '',
                status: MATCH_STATES.PLAYED
            }
        ],
        startTime: '2021-05-30',
        state: MATCH_STATES.WALK_OVER,
        tournamentRoundText: '1'
    },
    {
        id: 19880,
        name: 'Round 1 - Match 2',
        nextLooserMatchId: null,
        nextMatchId: 19878,
        participants: [
            {
                id: '5acb196d-5f82-47f3-ae5a-2e87d070f610',
                isWinner: false,
                name: 'کریم کریمی',
                picture: 'teamlogos/client_team_default_logo',
                resultText: 'Lost',
                status: 'PLAYED'
            },
            {
                id: '6d9ec9e8-d10d-424b-a00f-2078d4e08d39',
                isWinner: true,
                name: 'علی علیزاده',
                picture: 'teamlogos/client_team_default_logo',
                resultText: 'Won',
                status: 'PLAYED'
            }
        ],
        startTime: '2021-05-30',
        state: 'SCORE_DONE',
        tournamentRoundText: '1'
    },
    {
        id: 19882,
        name: 'Round 1 - Match 3',
        nextLooserMatchId: null,
        nextMatchId: 19881,
        participants: [
            {
                id: 'acf45434-78a1-4907-bf19-92235d180e8b',
                isWinner: true,
                name: 'مهران شهبازی',
                picture: null,
                resultText: 'Won',
                status: 'PLAYED'
            },
            {
                id: 'be2db859-515f-4159-9051-6723d0b47eb7',
                isWinner: false,
                name: 'حمید هیراد',
                picture: 'teamlogos/client_team_default_logo',
                resultText: 'Lost',
                status: 'PLAYED'
            }
        ],
        startTime: '2021-05-30',
        state: 'SCORE_DONE',
        tournamentRoundText: '1'
    },
    {
        id: 19883,
        name: 'Round 1 - Match 4',
        nextLooserMatchId: null,
        nextMatchId: 19881,
        participants: [
            {
                id: 'fdce979a-002e-4906-a80f-d161f108bcde',
                isWinner: true,
                name: 'میلاد شهابی نژاد',
                picture: 'teamlogos/client_team_default_logo',
                resultText: 'Won',
                status: 'PLAYED'
            },
            {
                id: 'b264744c-0114-46b9-ab28-a7f56aded7bd',
                isWinner: false,
                name: 'مهدی آل فقیه',
                picture: null,
                resultText: 'Lost',
                status: 'PLAYED'
            }
        ],
        startTime: '2021-05-30',
        state: 'SCORE_DONE',
        tournamentRoundText: '1'
    },
    {
        id: 19886,
        name: 'Round 1 - Match 5',
        nextLooserMatchId: null,
        nextMatchId: 19885,
        participants: [
            {
                id: 'd9a7b576-9d7e-430c-aa7e-6401d6eb7cf8',
                isWinner: false,
                name: 'جواد محمدی',
                picture: null,
                resultText: 'Lost',
                status: 'PLAYED'
            },
            {
                id: 'c7a2ec6b-389f-429d-819e-53594e94d475',
                isWinner: true,
                name: 'کامبیز جعفری',
                picture: 'teamlogos/client_team_default_logo',
                resultText: 'Won',
                status: 'PLAYED'
            }
        ],
        startTime: '2021-05-30',
        state: 'SCORE_DONE',
        tournamentRoundText: '1'
    },
    {
        id: 19887,
        name: 'Round 1 - Match 6',
        nextLooserMatchId: null,
        nextMatchId: 19885,
        participants: [
            {
                id: '8411c4ef-f337-42c9-bff9-63c2f0e80255',
                isWinner: false,
                name: 'حسن شیرازی',
                picture: 'teamlogos/client_team_default_logo',
                resultText: 'Lost',
                status: 'PLAYED'
            },
            {
                id: '059743f7-9501-471e-8f9e-2d1032eccc67',
                isWinner: true,
                name: 'محمد پایروند',
                picture: null,
                resultText: 'Won',
                status: 'PLAYED'
            }
        ],
        startTime: '2021-05-30',
        state: 'SCORE_DONE',
        tournamentRoundText: '1'
    },
    {
        id: 19889,
        name: 'Round 1 - Match 7',
        nextLooserMatchId: null,
        nextMatchId: 19888,
        participants: [
            {
                id: 'ce914b1b-fe1e-4be9-8409-681049265614',
                isWinner: true,
                name: 'محسن معصومی',
                picture: 'teamlogos/client_team_default_logo',
                resultText: 'Won',
                status: 'PLAYED'
            },
            {
                id: '86cd4ff0-14ae-445c-820a-777fe448cddb',
                isWinner: false,
                name: 'محمد علی فقیه خراسانی',
                picture: null,
                resultText: 'Lost',
                status: 'PLAYED'
            }
        ],
        startTime: '2021-05-30',
        state: 'SCORE_DONE',
        tournamentRoundText: '1'
    },
    {
        id: 19890,
        name: 'Round 1 - Match 8',
        nextLooserMatchId: null,
        nextMatchId: 19888,
        participants: [
            {
                id: '51c449a7-fb04-445a-b478-1ca95feeeafa',
                isWinner: true,
                name: 'علیرضا کرمی',
                picture: null,
                resultText: 'Won',
                status: 'PLAYED'
            },
            {
                id: 'b370498e-5e54-4d98-88ef-ba039ee7fb62',
                isWinner: false,
                name: 'محمد سعادت',
                picture: null,
                resultText: 'Lost',
                status: 'PLAYED'
            }
        ],
        startTime: '2021-05-30',
        state: 'SCORE_DONE',
        tournamentRoundText: '1'
    },
];