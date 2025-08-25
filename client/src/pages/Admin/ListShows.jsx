
import React, { useEffect, useState } from 'react';
import Title from '../../Components/Title';
import Loading from '../../Components/Loading';
import { dateFormate } from '../../lib/dateFormate';
import { useAppContext } from '../../context/AppProvider';

const ListShows = () => {
  const currency = import.meta.env.VITE_CURRENCY;
  const { axios, getToken, user } = useAppContext();
  const [show, setShow] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllShows = async () => {
    try {
      const { data } = await axios.get("/api/admin/all-shows", {
        headers: { Authorization: `Bearer ${await getToken()}` }
      });
      setShow(data.shows);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) getAllShows();
  }, [user]);

  return !loading ? (
    <div className="pl-6 pr-3 py-10 md:px-10">
      <Title text1="List" text2="Shows" />

      {/* Scrollable container with scrollbar */}
      <div className="overflow-x-auto rounded-t-md">
        <table className="table-auto text-left border-collapse min-w-max">
          <thead className="bg-primary/25 font-semibold">
            <tr>
              <th className="p-2 font-medium">Movie Name</th>
              <th className="p-2 font-medium">ShowTime</th>
              <th className="p-2 font-medium">Total Bookings</th>
              <th className="p-2 font-medium">Earnings</th>
            </tr>
          </thead>
          <tbody>
            {show.map((s, index) => (
              <tr
                key={index}
                className=" px-4 text-sm bg-primary/10 text-gray-200 even:bg-primary/20"
              >
                <td className="p-2">{s.movie.title}</td>
                <td className="p-2">{dateFormate(s.showDateTime)}</td>
                <td className="p-2">{Object.keys(s.occupiedSeats).length}</td>
                <td className="p-2">
                  {currency} {Object.keys(s.occupiedSeats).length * s.showPrice}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default ListShows;

