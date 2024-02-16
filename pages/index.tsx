import Search from "@/components/search";
import BreadCrumb from "@/components/ui/BreadCrumb";
import useWindowSize from "@/hooks/useWindowSize";

export default function Home() {
    const { width } = useWindowSize()

    return (
        <main>
            {
                width >= 1024
                    ?
                    <div className="container">
                        <div className="mt-8 mb-5 hidden lg:block">
                            <BreadCrumb
                                crumbs={[
                                    {
                                        name: 'ძიება',
                                        url: '/'
                                    },
                                    {
                                        name: 'იყიდება',
                                        url: ''
                                    },
                                ]}
                            />
                        </div>

                        <Search />
                    </div>
                    :
                    <Search />
            }
        </main>
    );
}
