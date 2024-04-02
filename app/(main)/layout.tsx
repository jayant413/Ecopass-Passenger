import Header from "@/components/Header";

const MainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className="w-full h-[100vh]">
      <div className="h-[8vh]">
        {" "}
        <Header />
      </div>
      <div className="h-[92vh] w-full bg-gray-100 overflow-y-auto">
        {children}
      </div>
    </main>
  );
};

export default MainLayout;
