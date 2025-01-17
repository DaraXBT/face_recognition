"use client";

import {useState, useEffect, JSX} from "react";
import {Check, Clock, ArrowUp, Printer, FileSpreadsheet} from "lucide-react";
import VideoFeed from "./VideoFeed";
import RecognitionResults from "./RecognitionResults";
import ControlPanel from "./ControlPanels";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Button} from "@/components/ui/button";
import {exportToExcel, printData} from "@/lib/utils";

const cambodianNames = [
  "Dara",
  "Mouyland",
  "Makara",
  "Nita",
  "Kongkea",
  "Channa",
  "Sophea",
  "Bopha",
  "Sokha",
  "Phalla",
  "Samnang",
  "Thida",
  "Kosal",
  "Pich",
  "Sothy",
  "Kunthea",
  "Vibol",
  "Channary",
];

export type RecognitionStatus = "on time" | "late" | "early";

export interface RecognitionResult {
  id: string;
  name: string;
  timestamp: Date;
  status: RecognitionStatus;
}

const statusConfig: Record<
  RecognitionStatus,
  {icon: JSX.Element; color: string}
> = {
  "on time": {icon: <Check className="h-4 w-4" />, color: "bg-green-500"},
  late: {icon: <Clock className="h-4 w-4" />, color: "bg-red-500"},
  early: {icon: <ArrowUp className="h-4 w-4" />, color: "bg-blue-500"},
};

export default function Dashboard() {
  const [isRecognizing, setIsRecognizing] = useState(false);
  const [recognitionResults, setRecognitionResults] = useState<
    RecognitionResult[]
  >([]);

  const toggleRecognition = () => {
    setIsRecognizing((prev) => !prev);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecognizing) {
      interval = setInterval(() => {
        const statuses: RecognitionStatus[] = ["on time", "late", "early"];
        const selectedStatus =
          statuses[Math.floor(Math.random() * statuses.length)];

        const newResult: RecognitionResult = {
          id: Math.random().toString(36).substr(2, 9),
          name: cambodianNames[
            Math.floor(Math.random() * cambodianNames.length)
          ],
          timestamp: new Date(),
          status: selectedStatus,
        };
        setRecognitionResults((prev) => [...prev, newResult]);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isRecognizing]);

  const handlePrint = () => {
    printData(recognitionResults);
  };

  const handleExport = () => {
    exportToExcel(recognitionResults);
  };

  return (
    <div className="space-y-6">
      <ControlPanel
        isRecognizing={isRecognizing}
        onToggle={toggleRecognition}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Video Feed</CardTitle>
          </CardHeader>
          <CardContent>
            <VideoFeed isRecognizing={isRecognizing} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Recognition Data</CardTitle>
            <div className="space-x-2">
              <Button variant="outline" size="sm" onClick={handlePrint}>
                <Printer className="h-4 w-4 mr-2" />
                Print
              </Button>
              <Button variant="outline" size="sm" onClick={handleExport}>
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="results" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="results">Results</TabsTrigger>
                <TabsTrigger value="stats">Statistics</TabsTrigger>
              </TabsList>
              <TabsContent value="results" className="mt-0">
                <RecognitionResults results={recognitionResults} />
              </TabsContent>
              <TabsContent value="stats" className="mt-0">
                <div className="grid grid-cols-3 gap-4">
                  <StatCard
                    title="Total Detections"
                    value={recognitionResults.length}
                  />
                  <StatCard
                    title="On Time"
                    value={
                      recognitionResults.filter((r) => r.status === "on time")
                        .length
                    }
                    icon={<Check className="h-4 w-4" />}
                    color="bg-green-500"
                  />
                  <StatCard
                    title="Late"
                    value={
                      recognitionResults.filter((r) => r.status === "late")
                        .length
                    }
                    icon={<Clock className="h-4 w-4" />}
                    color="bg-red-500"
                  />
                  <StatCard
                    title="Early"
                    value={
                      recognitionResults.filter((r) => r.status === "early")
                        .length
                    }
                    icon={<ArrowUp className="h-4 w-4" />}
                    color="bg-blue-500"
                    className="col-span-3"
                  />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: number;
  icon?: React.ReactNode;
  color?: string;
  className?: string;
}

function StatCard({title, value, icon, color, className}: StatCardProps) {
  return (
    <div className={`p-4 bg-muted rounded-lg text-center ${className}`}>
      <p className="text-2xl font-bold flex items-center justify-center">
        {value}
        {icon && (
          <span
            className={`ml-2 inline-flex items-center justify-center w-6 h-6 rounded-full ${color} text-white`}>
            {icon}
          </span>
        )}
      </p>
      <p className="text-muted-foreground">{title}</p>
    </div>
  );
}
