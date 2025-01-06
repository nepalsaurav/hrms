export function getTotalLeavesTaken(leaves, from_date, to_date) {
  let totalLeaveDays = 0;
  leaves.forEach((leave) => {
    const fromDate = new Date(leave.leave_from);
    const toDate = new Date(leave.leave_to);
    // Adjust the leave period to fit within the range 2024-11-14 to 2024-12-15
    const leaveStart = new Date(Math.max(fromDate, new Date(from_date)));
    const leaveEnd = new Date(Math.min(toDate, new Date(to_date)));

    // Calculate the number of days in the adjusted leave period
    if (leave.status === "accepted") {
      if (leave.is_half) {
        totalLeaveDays += 0.5;
      } else {
        if (leaveEnd >= leaveStart) {
          const diffInTime = leaveEnd.getTime() - leaveStart.getTime();
          const days = diffInTime / (1000 * 3600 * 24) + 1; // +1 to include both start and end dates
          totalLeaveDays += days;
        }
      }
    }
  });
  return totalLeaveDays;
}
