import React from "react";

type TitleInvitationCodeCardProps = {
  teamName: string;
  invitationCode: string;
};

export default function TitleInvitationCodeCard({
  teamName,
  invitationCode,
}: TitleInvitationCodeCardProps) {
  return (
    <div className="flex items-center justify-between w-full h-full p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
      <p className="text-xl font-semibold mr-6">
        <span className="text-gray-600">Team Name:</span> {teamName}
      </p>
      <div>

      <p className="text-gray-500">
        <span className="text-gray-600">Invitation Code:</span> {invitationCode}
      </p>
      </div>
    </div>
  );
}
