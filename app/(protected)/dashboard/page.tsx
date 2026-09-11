"use client"

import { useEvents } from "@/hooks/useEvents";
import { useFetchUsers } from "@/hooks/useFetchUsers";
import { collection, db, getDocs } from "@/lib/firebase";
import { Download } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

type IProps = {
  title: string; 
  total: string;
  bgColor: string;
}

export default function Dashboard() {
  const [waitlist, setWaitlist] = useState<any[]>([]);
  const [date, setDate] = useState<string>("");
  const [wIsLoading, setWisLoading] = useState<boolean>(false);

  const {
    events,
    isLoading,
  } = useEvents({ page: 1, limit: 10, date});

  const {
    players,
    isLoading: pIsLoading,
  } = useFetchUsers({ page: 1, limit: 10});

  const exportToCSV = () => {
    if (!waitlist.length) return;

    const headers = ["Name", "Email", "Sport"];

    const rows = waitlist.map((user) => [
      user.name,
      user.email,
      user.sport,
    ]);

    const escapeCSV = (value: unknown) =>
      `"${String(value ?? "").replace(/"/g, '""')}"`;

    const csv = [
      headers,
      ...rows,
    ]
      .map((row) => row.map(escapeCSV).join(","))
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "waitlist.csv";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  const getWaitlist = async () => {
    setWisLoading(true)
    try {
      const snapshot = await getDocs(
        collection(db, "waitlist")
      );

      const waitlist = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return waitlist;
    } catch (error) {
      console.error("Failed to fetch waitlist:", error);
      throw error;
    } finally {
      setWisLoading(false)
    }
  };

  const RenderCard = ({title, total, bgColor}: IProps) => {
    return (
      <div
        className="w-full min-h-50 rounded-4xl flex-col gap-4
          shadow-sm flex justify-center items-center
        "
        style={{backgroundColor: bgColor}}
      >
        <span className="font-normal text-2xl">
          {title}
        </span>
        <span className="font-bold text-4xl">
          {total}
        </span>
      </div>
    )
  }

  useEffect(() => {
    const fetchWaitlist = async () => {
      const data = await getWaitlist();

      setWaitlist(data);
    };

    fetchWaitlist();
  }, []);

  return (
    <div className="flex flex-1 px-6 flex-col">
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        <RenderCard
          title="Waitlist"
          total={wIsLoading ? "..." : String(waitlist.length)}
          bgColor="#f3f4f6"
        />

        <RenderCard
          title="Players"
          total={pIsLoading ? "..." : String(players.count)}
          bgColor="#dcfce7"
        />

        <RenderCard
          title="Events"
          total={isLoading ? "..." : String(events.count)}
          bgColor="#ffe2e2"
        />
      </div>

      <div className="mt-12 w-full overflow-hidden rounded-lg border border-gray-600 bg-white">
        <div className="flex justify-between items-center w-full p-3">
          <span className="font-black text-2xl">
            Waitlist
          </span>
          <Button
            className="text-white bg-green-600 lex items-center justify-center gap-2 px-4 py-2 rounded-lg"
            onClick={exportToCSV}
          >
              <Download/>
              Download
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-200">
              <TableHead className="text-black border-r font-semibold">Email</TableHead>
              <TableHead className="text-black border-r font-semibold">Name</TableHead>
              <TableHead className="text-black font-semibold">Sport</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {waitlist.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium border-r">
                  {user.email}
                </TableCell>

                <TableCell className="text-gray-500 border-r">
                  {user.name ?? ""}
                </TableCell>

                <TableCell>
                  {user.sport ?? ""}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
