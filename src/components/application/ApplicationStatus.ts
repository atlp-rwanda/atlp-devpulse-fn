export const getStatusClass = (status: string): string => {
    switch (status) {
      case "submitted":
        return "bg-blue-500 text-white";
      case "Shortlisted":
        return "bg-teal-500 text-white";
      case "English assessment":
        return "bg-yellow-500 text-white";
      case "Technical assessment":
        return "bg-orange-500 text-white";
      case "Done Technical assessment":
        return "bg-purple-500 text-white";
      case "Invited for Home Challenge":
        return "bg-teal-500 text-white";
      case "Done Home Challenge":
        return "bg-indigo-500 text-white";
      case "Invited for Interview":
        return "bg-pink-500 text-white";
      case "Accepted":
        return "bg-teal-700 text-white";
      case "Rejected":
        return "bg-red-500 text-white";
      case "Missed English assessment":
      case "Missed Technical assessment":
      case "Missed Interview":
      case "Missed Home Challenge":
        return "bg-gray-500 text-white";
      default:
        return "bg-gray-300 text-black";
    }
  };
  