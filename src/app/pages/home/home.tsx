import {
  AppShell,
  Burger,
  Footer,
  Header,
  Image,
  MediaQuery,
  Navbar,
  Text,
  useMantineTheme
} from '@mantine/core';
import { IconAffiliateFilled, IconDeviceCameraPhone } from '@tabler/icons-react';
import { useState } from 'react';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Gateway from '../gateway/gateway';
import { NotFound } from '../notFound/notFound';
import Peripheral from '../peripherical/peripheral';

export default function Home() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [active, setActive] = useState(0);
  const yearNow: String = new Date().getFullYear().toString();

  return (
    <Router>
      <AppShell
        styles={{
          main: {
            background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0]
          }
        }}
        navbarOffsetBreakpoint="sm"
        asideOffsetBreakpoint="sm"
        navbar={
          <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
            <div className="home__links">
              <Text fw={500} component={Link} variant="link" to="/gateways">
                <IconDeviceCameraPhone size="1.5rem" stroke={1.5} />
                Gateway
              </Text>
              <Text fw={500} component={Link} variant="link" to="/peripherals">
                <IconAffiliateFilled size="1.5rem" stroke={1.5} />
                Peripheral
              </Text>
            </div>
          </Navbar>
        }
        footer={
          <Footer height={70} p="md" mx="auto">
            <Text>&copy; {yearNow} All rights reserved.</Text>
            <Text>by David537</Text>
          </Footer>
        }
        header={
          <Header height={{ base: 50, md: 80 }} p="md">
            <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
              <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                <Burger
                  opened={opened}
                  onClick={() => setOpened((o) => !o)}
                  size="sm"
                  color={theme.colors.gray[6]}
                  mr="xl"
                />
              </MediaQuery>
              <Image mx={10} maw={45} radius="md" src="./logo.png" alt="Logo image" />
              <Text
                variant="gradient"
                gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
                sx={{ fontFamily: 'Greycliff CF, sans-serif' }}
                ta="center"
                fz="xl"
                fw={700}
                mx={10}
              >
                Gateways
              </Text>
            </div>
          </Header>
        }
      >
        <Routes>
          <Route path="/gateways" element={<Gateway />} />
          <Route path="/peripherals" element={<Peripheral />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AppShell>
    </Router>
  );
}
