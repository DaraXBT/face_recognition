import { ScrollArea } from '@/components/ui/scroll-area'
import { Check, Clock, ArrowUp } from 'lucide-react'
import { RecognitionResult, RecognitionStatus } from './Dashboard'
import { JSX } from 'react';

const statusConfig: Record<RecognitionStatus, { icon: JSX.Element; color: string }> = {
  'on time': { icon: <Check className="h-4 w-4" />, color: 'bg-green-500' },
  'late': { icon: <Clock className="h-4 w-4" />, color: 'bg-red-500' },
  'early': { icon: <ArrowUp className="h-4 w-4" />, color: 'bg-blue-500' },
};

interface RecognitionResultsProps {
  results: RecognitionResult[]
}

export default function RecognitionResults({ results }: RecognitionResultsProps) {
  return (
    <ScrollArea className="h-[400px] pr-4">
      {results.length === 0 ? (
        <p className="text-center text-muted-foreground py-4">No recognition results yet.</p>
      ) : (
        <ul className="space-y-2">
          {results.map((result) => (
            <li key={result.id} className="bg-muted p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 animate-fade-in-up flex items-center justify-between">
              <div>
                <span className="font-semibold">{result.name}</span>
                <span className="text-muted-foreground ml-2 text-sm">
                  {result.timestamp.toLocaleTimeString()}
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-sm mr-2 capitalize">{result.status}</span>
                <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full ${statusConfig[result.status].color} text-white`} title={result.status}>
                  {statusConfig[result.status].icon}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </ScrollArea>
  )
}

