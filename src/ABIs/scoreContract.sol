// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

contract ReadyScore {
    struct DayData {
        uint256 readyScore;
        uint256 sleepScore;
    }

    mapping(address => mapping(string => DayData)) private userDailyScores;
    mapping(address => string[]) private userStoredDaysList;
    mapping(address => mapping(string => bool)) private userStoredDaysSet;

    // Event emitted when scores are stored
    event ScoresStored(address indexed user, string date, uint256 readyScore, uint256 sleepScore);
    
    /**
     * @notice Store scores for a specific date.
     * @param date The date (in "MM/DD/YYYY" format) to store the scores for.
     * @param readyScore The readiness score to store.
     * @param sleepScore The sleep score to store.
     */
    function storeScores(string memory date, uint256 readyScore, uint256 sleepScore) external {
        if (!userStoredDaysSet[msg.sender][date]) {
            userStoredDaysSet[msg.sender][date] = true;
            userStoredDaysList[msg.sender].push(date);
        }

        userDailyScores[msg.sender][date] = DayData({
            readyScore: readyScore,
            sleepScore: sleepScore
        });

        emit ScoresStored(msg.sender, date, readyScore, sleepScore);
    }

    /**
     * @notice Retrieve the scores stored for a specific user and date.
     * @param user The address of the user to retrieve scores for.
     * @param date The date (in "MM/DD/YYYY" format) to retrieve the scores for.
     * @return The readiness score and the sleep score stored on the specified date.
     */
    function getScoresByDate(address user, string memory date) external view returns (uint256, uint256) {
        DayData memory dayData = userDailyScores[user][date];
        require(userStoredDaysSet[user][date], "No scores stored for this date");
        return (dayData.readyScore, dayData.sleepScore);
    }

    /**
     * @notice Get the list of dates for which the user has stored scores.
     * @param user The address of the user to get stored days for.
     * @return An array of dates.
     */
    function getStoredDays(address user) external view returns (string[] memory) {
        return userStoredDaysList[user];
    }

    /**
     * @notice Get the count of days for which the user has stored scores.
     * @param user The address of the user to get stored days count for.
     * @return The count of stored days.
     */
    function getStoredDaysCount(address user) external view returns (uint256) {
        return userStoredDaysList[user].length;
    }
}
