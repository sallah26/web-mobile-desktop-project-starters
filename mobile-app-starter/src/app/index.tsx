
import { Button } from '@/components/ui/button';
import { Text } from '@/components';
import { View } from 'lucide-react-native';

export default function HomeScreen() {
  return (
    <View className='w-screen'>
      <Text className="w-20 text-white font-bold"  >
        Welcome!
      </Text>
      <Button className='w-screen'>
        <Text>This Is from Shadcn UI</Text>
      </Button>
    </View>
  );
}

