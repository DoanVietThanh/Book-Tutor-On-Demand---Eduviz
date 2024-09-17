import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type TutorClassDetailProps = {
  params: { classId: string };
};

const TutorClassDetail = ({ params }: TutorClassDetailProps) => {
  return (
    <div className="pt-4 overflow-y-auto">
      <div>Class ID {params.classId}</div>
      <div>
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">STT</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Age</TableHead>
              <TableHead className="text-right">Average Point</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>John Doe</TableCell>
                <TableCell>20</TableCell>
                <TableCell className="text-right">5.8</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TutorClassDetail;
