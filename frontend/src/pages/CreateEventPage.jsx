import React, { useState } from "react";
import Accordion from "../components/Accordion";
import ListManager from "../components/ListManager";
import PageLayout from "../components/PageLayout";

const CreateEventPage = () => {
  const [eventDetails, setEventDetails] = useState({
    eventName: "",
    date: "",
    venue: "",
    members: "",
    rulebookLink: "",
    amount: "",
    description: "",
    coordinators: [],
    usefulLinks: [],
  });

  const [showPopup, setShowPopup] = useState(false);
  const [editingSections, setEditingSections] = useState({
    basicDetails: true,
    description: true,
    rulebook: true,
    registrationFee: true,
    coordinators: true,
    usefulLinks: true,
  });

  const handleSaveEvent = () => {
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveSection = (section) => {
    console.log(`Saved ${section}:`, eventDetails[section]);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
    setEditingSections((prev) => ({ ...prev, [section]: false }));
  };

  const handleEditSection = (section) => {
    setEditingSections((prev) => ({ ...prev, [section]: true }));
  };

  return (
    <PageLayout title={"Create Event "}>
      <div className="min-h-[100vh]">
        <div className="flex flex-col items-center justify-center text-center py-2">
          <div className="flex space-x-4">
            <button
              onClick={handleSaveEvent}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 
                 hover:from-blue-600 hover:to-purple-600 text-white font-semibold 
                 rounded-full shadow-lg transition-transform transform hover:scale-105"
            >
              Save
            </button>

            <button
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 
                 hover:from-green-600 hover:to-teal-600 text-white font-semibold 
                 rounded-full shadow-lg transition-transform transform hover:scale-105"
            >
              Make Live
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-h-full flex justify-center p-3 md:p-5 overflow-y-auto">
          <div className="flex flex-col gap-4 p-4 md:p-6 rounded-lg w-full max-w-2xl">
            <Accordion
              title="Basic Details"
              onSave={() => handleSaveSection("basicDetails")}
              isEditing={editingSections.basicDetails}
              setIsEditing={(value) =>
                setEditingSections((prev) => ({ ...prev, basicDetails: value }))
              }
            >
              <input
                type="text"
                name="eventName"
                placeholder="Event Name"
                value={eventDetails.eventName}
                onChange={handleInputChange}
                className="p-2 border-b-2 border-gray-400/50 bg-transparent focus:outline-none"
                disabled={!editingSections.basicDetails}
              />
              <input
                type="date"
                name="date"
                placeholder="Date"
                value={eventDetails.date}
                onChange={handleInputChange}
                className="p-2 border-b-2 border-gray-400/50 bg-transparent focus:outline-none"
                disabled={!editingSections.basicDetails}
              />
              <input
                type="text"
                name="venue"
                placeholder="Venue"
                value={eventDetails.venue}
                onChange={handleInputChange}
                className="p-2 border-b-2 border-gray-400/50 bg-transparent focus:outline-none"
                disabled={!editingSections.basicDetails}
              />
              <input
                type="number"
                name="members"
                placeholder="No of Members"
                value={eventDetails.members}
                onChange={handleInputChange}
                className="p-2 border-b-2 border-gray-400/50 bg-transparent focus:outline-none"
                disabled={!editingSections.basicDetails}
              />
              <input
                type="file"
                name="poster"
                placeholder="Poster"
                className="p-2 border-b-2 border-gray-400/50 bg-transparent focus:outline-none"
                disabled={!editingSections.basicDetails}
              />
            </Accordion>

            <Accordion
              title="Description"
              onSave={() => handleSaveSection("description")}
              isEditing={editingSections.description}
              setIsEditing={(value) =>
                setEditingSections((prev) => ({ ...prev, description: value }))
              }
            >
              <textarea
                name="description"
                placeholder="Event Description"
                value={eventDetails.description}
                onChange={(e) => {
                  handleInputChange(e);
                  e.target.style.height = "auto";
                  e.target.style.height = `${e.target.scrollHeight}px`;
                }}
                className="p-2 border-b-2 border-gray-400/50 bg-transparent focus:outline-none resize-none overflow-hidden"
                disabled={!editingSections.description}
              />
            </Accordion>

            <Accordion
              title="Rulebook"
              onSave={() => handleSaveSection("rulebook")}
              isEditing={editingSections.rulebook}
              setIsEditing={(value) =>
                setEditingSections((prev) => ({ ...prev, rulebook: value }))
              }
            >
              <input
                type="text"
                name="rulebookLink"
                placeholder="Rulebook Link"
                value={eventDetails.rulebookLink}
                onChange={handleInputChange}
                className="p-2 border-b-2 border-gray-400/50 bg-transparent focus:outline-none"
                disabled={!editingSections.rulebook}
              />
            </Accordion>

            <Accordion
              title="Registration Fee"
              onSave={() => handleSaveSection("registrationFee")}
              isEditing={editingSections.registrationFee}
              setIsEditing={(value) =>
                setEditingSections((prev) => ({
                  ...prev,
                  registrationFee: value,
                }))
              }
            >
              <input
                type="text"
                name="amount"
                placeholder="Amount"
                value={eventDetails.amount}
                onChange={handleInputChange}
                className="p-2 border-b-2 border-gray-400/50 bg-transparent focus:outline-none"
                disabled={!editingSections.registrationFee}
              />
              <input
                type="file"
                name="feeProof"
                placeholder="Fee Proof"
                className="p-2 border-b-2 border-gray-400/50 bg-transparent focus:outline-none"
                disabled={!editingSections.registrationFee}
              />
            </Accordion>

            <Accordion
              title="Coordinators"
              onSave={() => handleSaveSection("coordinators")}
              isEditing={editingSections.coordinators}
              setIsEditing={(value) =>
                setEditingSections((prev) => ({ ...prev, coordinators: value }))
              }
            >
              <ListManager
                items={eventDetails.coordinators}
                setItems={(newList) =>
                  setEventDetails((prev) => ({
                    ...prev,
                    coordinators: newList,
                  }))
                }
                placeholder1="Name"
                placeholder2="Mobile Number"
                isEditing={editingSections.coordinators}
              />
            </Accordion>

            <Accordion
              title="Useful Links"
              onSave={() => handleSaveSection("usefulLinks")}
              isEditing={editingSections.usefulLinks}
              setIsEditing={(value) =>
                setEditingSections((prev) => ({ ...prev, usefulLinks: value }))
              }
            >
              <ListManager
                items={eventDetails.usefulLinks}
                setItems={(newList) =>
                  setEventDetails((prev) => ({ ...prev, usefulLinks: newList }))
                }
                placeholder1="Title"
                placeholder2="Link"
                isEditing={editingSections.usefulLinks}
              />
            </Accordion>
          </div>
        </div>

        {showPopup && (
          <div className="fixed bottom-6 right-6 z-50 animate-fade-in">
            <div className="w-80 h-24 bg-gray-900 rounded-2xl flex items-center justify-center relative overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-40 animate-pulse"></div>
              <h2 className="text-white font-semibold text-lg z-10">
                Saved Successfully!
              </h2>
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default CreateEventPage;
