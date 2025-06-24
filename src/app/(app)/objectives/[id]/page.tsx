"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { auth, db } from "@/integrations/firebase/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Target } from "lucide-react";
import { KeyResult, KeyResult as KeyResultType, Objective } from "@/types/objectives";
import MetaInfoGrid from "@/components/MetaInfoGrid";

interface KeyResultCardProps {
  keyResult: KeyResultType & { objectiveId: string };
}

const KeyResultCard = ({ keyResult }: KeyResultCardProps) => {
  const [current, setCurrent] = useState(keyResult.current);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  // Calculate progress
  const baseline = Number(keyResult.baseline) || 0;
  const target = Number(keyResult.target) || 0;
  const progress = target !== baseline ? ((Number(current) - baseline) / (target - baseline)) * 100 : 0;

  // Save to Firestore (and parent objective)
  const handleSave = async () => {
    setSaving(true);
    setSuccess(false);
    try {
      // Update the key result in the parent objective
      const ref = doc(db, "objectives", keyResult.objectiveId);
      // Fetch the latest objective
      const snapshot = await getDoc(ref);
      if (!snapshot.exists()) return;
      const data = snapshot.data();
      const updatedKeyResults = (data.key_results || []).map((kr: any) =>
        kr.id === keyResult.id ? { ...kr, current } : kr
      );
      await updateDoc(ref, { key_results: updatedKeyResults, updated_at: new Date().toISOString() });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 1200);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card className="w-full px-4 py-4 bg-white shadow-md rounded-xl border border-gray-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-black">
          {keyResult.keyResult}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground space-y-2">
        <div className="flex flex-col gap-1 mb-2">
          <p><span className="font-medium text-black">Explanation:</span> {keyResult.explanation}</p>
          <p><strong className="text-black">Owner:</strong> {keyResult.owner}</p>
        </div>
            <p className="mt-2"><strong>Comment:</strong> {keyResult.comment}</p>
        <div className="flex flex-col gap-2 mt-2">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <p><strong>Baseline:</strong> {keyResult.baseline}</p>
            <div className="flex items-center gap-2">
              <strong>Current:</strong>
              <input
                type="number"
                className="border rounded px-2 py-1 w-20 text-black bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={current ?? ''}
                onChange={e => setCurrent(e.target.value === '' ? null : Number(e.target.value))}
                min={baseline}
                max={target}
                step="any"
                disabled={saving}
              />
              <button
                onClick={handleSave}
                className={`ml-2 px-3 py-1 rounded text-white ${success ? 'bg-green-500' : 'bg-blue-600 hover:bg-blue-700'} transition`}
                disabled={saving || Number(current) === Number(keyResult.current)}
              >
                {success ? 'Saved' : saving ? 'Saving...' : 'Save'}
              </button>
            </div>
            <p><strong>Target:</strong> {keyResult.target}</p>
          </div>
          <div className="w-full mt-2">
            <Progress value={progress} />
            <div className="text-xs text-gray-500 mt-1">Progress: {Math.round(progress)}%</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default function ObjectiveDetailPage() {
  const { id } = useParams();
  const [objective, setObjective] = useState<Objective | null>(null);
  const [loading, setLoading] = useState(true);
  const user = auth.currentUser;

  useEffect(() => {
    const fetchObjective = async () => {
      const ref = doc(db, "objectives", id as string);
      const snapshot = await getDoc(ref);
      if (snapshot.exists()) {
        setObjective({ id: snapshot.id, ...snapshot.data() } as Objective);
      }
      setLoading(false);
    };

    fetchObjective();
  }, [id]);

  const handleEdit = async (updates: Partial<Objective>) => {
    if (!id) return;
    const ref = doc(db, "objectives", id as string);
    await updateDoc(ref, {
      ...updates,
      updated_at: new Date().toISOString(),
    });
  };

  if (loading || !objective) {
    return <div className="p-8 text-white">Loading...</div>;
  }

  // Unified meta/title section for both types
  const metaAndTitleSection = (
    <div className="w-full max-w-screen-2xl mx-auto py-10">
      <Card className="mb-2">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center flex flex-col sm:flex-row items-center gap-2 justify-center">
            {objective.title}
            <div className="flex flex-wrap gap-2 justify-center">
              {objective.status === "in_progress" && (
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  In Progress
                </span>
              )}
              {objective.status === "completed" && (
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                  Done
                </span>
              )}
              {objective.personalObjective && (
                <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                  Personal
                </span>
              )}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center text-lg text-muted-foreground">
          {objective.description}
        </CardContent>
      </Card>
      <MetaInfoGrid
        owner={objective.owner || 'Company'}
        createdAt={objective.created_at ? String(objective.created_at) : ''}
        type={objective.type === 'values' ? 'Values' : (objective.type + ' Objective')}
        statLabel={objective.type === 'values' ? 'Number of Values' : 'Key Results'}
        statValue={objective.type === 'values' ? (objective.values || []).length : (objective.key_results?.length || 0)}
      />
    </div>
  );

  if (objective.type === 'values') {
    return (
      <div className="w-full max-w-screen-2xl mx-auto py-10">
        {metaAndTitleSection}
        <div className="space-y-6">
          {(objective.values || []).map((val: { value: string; explanation: string }, idx: number) => (
            <Card key={idx} className="w-full mb-4">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-black">{val.value}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-base text-gray-700 whitespace-pre-line">{val.explanation}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-screen-2xl mx-auto py-10 space-y-6">
      {metaAndTitleSection}
      

      {/* Key Results */}
      <div className="flex items-center gap-2 text-gray-900 mb-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-white p-2">Key Results
          <Target className="h-5 w-5 text-blue-500 inline-block ml-2" />
        </h1>
      </div>
      {objective.key_results && objective.key_results.length > 0 ? (
        <div className="space-y-4">
          {objective.key_results.map((kr: KeyResult, idx: number) => (
            <KeyResultCard key={kr.id || idx} keyResult={{ ...kr, objectiveId: objective.id }} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No key results found.</p>
      )}
    </div>
  );
}
