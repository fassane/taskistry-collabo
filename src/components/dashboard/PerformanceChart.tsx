
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { UserPerformance, User } from '@/utils/types';

interface PerformanceChartProps {
  performances: UserPerformance[];
  users: User[];
}

const PerformanceChart: React.FC<PerformanceChartProps> = ({ performances, users }) => {
  // Only show teachers' performance
  const teacherPerformances = performances.filter(p => {
    const user = users.find(u => u.id === p.userId);
    return user && user.role === 'teacher';
  });

  const sortedData = [...teacherPerformances].sort((a, b) => b.score - a.score);

  const getBonusCategory = (score: number): string => {
    if (score >= 90) return "Prime excellente";
    if (score >= 75) return "Prime supérieure";
    if (score >= 60) return "Prime standard";
    return "Pas de prime";
  };

  const getBarColor = (score: number): string => {
    if (score >= 90) return "#10B981"; // Vert - Excellent
    if (score >= 75) return "#3B82F6"; // Bleu - Supérieur
    if (score >= 60) return "#F59E0B"; // Orange - Standard
    return "#EF4444"; // Rouge - Insuffisant
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const user = users.find(u => u.id === data.userId);
      
      return (
        <div className="bg-white p-3 shadow-lg rounded-md border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <p className="font-medium">{user?.name}</p>
          <p className="text-sm text-muted-foreground">Score: <span className="font-medium">{data.score}</span></p>
          <p className="text-sm text-muted-foreground">Tâches terminées: <span className="font-medium">{data.completedTasks}</span></p>
          <p className="text-sm text-muted-foreground">Taux complétion à temps: <span className="font-medium">{data.onTimeCompletionRate}%</span></p>
          <div className="mt-1 pt-1 border-t">
            <p className="text-sm font-medium" style={{ color: getBarColor(data.score) }}>
              {getBonusCategory(data.score)}
            </p>
          </div>
        </div>
      );
    }
    
    return null;
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Performance des enseignants</CardTitle>
        <CardDescription>Scores pour l'attribution des primes</CardDescription>
      </CardHeader>
      <CardContent className="h-[300px]">
        {teacherPerformances.length === 0 ? (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            Pas de données de performance disponibles
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={sortedData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <XAxis 
                dataKey="userName" 
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => value.split(' ')[0]} // Show only first name for space
              />
              <YAxis domain={[0, 100]} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="score" name="Score">
                {sortedData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getBarColor(entry.score)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default PerformanceChart;
